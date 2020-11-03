import psycopg2
from datetime import datetime
import argparse
import os
import requests
import json
from nltk import tokenize
from snips_nlu import SnipsNLUEngine
import tensorflow as tf
from math import radians, cos, sin, asin, sqrt
import pandas as pd
from data.utils import single_pt_haversine


predicthq_token = os.environ['predicthq_token']
twitter_token = os.environ['twitter_token']    
loaded_engine = SnipsNLUEngine.from_path("./nlp/model") 

categorical_features_category = tf.feature_column.categorical_column_with_hash_bucket("category", hash_bucket_size=50)
categorical_feature_category_emb = tf.feature_column.embedding_column(categorical_column=categorical_features_category, dimension=3)
rank = tf.feature_column.numeric_column("rank")
status = tf.feature_column.numeric_column("status")
harvesine_distance = tf.feature_column.numeric_column("harvesine_distance")
model = tf.estimator.DNNClassifier(
feature_columns=[rank, categorical_feature_category_emb, harvesine_distance],
hidden_units=[1024, 512, 256], model_dir='./models')

if 'ENVIRONMENT' in os.environ and os.environ['ENVIRONMENT'] == 'PRODUCTION':
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' 

def get_events():
    
    response = requests.get(
    url="https://api.predicthq.com/v1/events",
    headers={
      "Authorization": "Bearer " + predicthq_token,
      "Accept": "application/json"
    },
    params={
      "country": "CA",
      "limit": 30,
      "sort": "start",
    }
).json()

    if not response["next"]:
        return response["results"]
    else:
        results = response["results"]
        while response["next"]:
            response = requests.get(url=response["next"], headers={
            "Authorization": "Bearer " + predicthq_token,
            "Accept": "application/json"
            }).json()

            results += response["results"]

            
        return results

def get_music_tweets_query(query):
    response = requests.get(
    url="https://api.twitter.com/labs/1/tweets/search?query={}&max_results=100".format(query),
    headers={
      "Authorization": "Bearer " + twitter_token,
      "Accept": "application/json"
    }
    )

    results = response.json()
    tweets = []
    if not 'errors' in results and results["meta"]['result_count'] > 0:
        for tweet in results["data"]:
            response_to_nlp = loaded_engine.parse(tweet["text"])
            if not response_to_nlp["intent"]["intentName"] is None and response_to_nlp["intent"]["probability"] > 0.6:
                print(tweet)
                tweets.append(tweet)


    return tweets

def check_category(event, confidence_score):
    if event['category'] == 'concerts':
        confidence_score += 80
    if event['category'] == 'school-holidays' or event['category'] == 'public-holidays':
        confidence_score += 40
    elif event['category'] == 'observances':
        confidence_score += 20
    elif event['category'] == 'community':
        confidence_score += 45
    elif event['category'] == 'politics':
        confidence_score += 5
    elif event['category'] == 'conferences':
        confidence_score += 5
    elif event['category'] == 'expos':
        confidence_score += 25
    elif event['category'] == 'festivals':
        confidence_score += 75
    elif event['category'] == 'performing-arts':
        confidence_score += 60
    elif event['category'] == 'sports':
        confidence_score += 10
    elif event['category'] in ['daylight-savings', 'airport-delays', 'severe-weather', 'disasters', 'terror']:
        confidence_score -= 100
    return confidence_score

def use_ml(event, confidence_score):
    distance = single_pt_haversine(event['location'][0], event['location'][1])
    test_data = pd.DataFrame({'rank': event['rank'], 'category': event['category'], 'harvesine_distance': distance}, index = [1])
    pred_fn = tf.estimator.inputs.pandas_input_fn(x=test_data,batch_size=1, shuffle=False)
    predictions = list(model.predict(input_fn=pred_fn))
    prediction = predictions[0]['class_ids'][0]
    # Puting little weight on ML model for now as it just based on fake data
    if prediction == 1:
        confidence_score += 1
    return confidence_score

def use_nlp(event, confidence_score):
    description_tokens = tokenize.sent_tokenize(event['description'])
    flag_description = False
    for token in description_tokens:
        response_to_nlp = loaded_engine.parse(token)
        if not response_to_nlp["intent"]["intentName"] is None and response_to_nlp["intent"]["probability"] > 0.6: 
            flag_description = True
            confidence_score += 10

    return confidence_score, flag_description

def check_confidence(event):
    confidence_score = 0
    try:
        connection = psycopg2.connect(os.environ['DATABASE_URL'])
        cursor = connection.cursor()
        cursor.execute("SELECT id from leads where id = %s", [event["id"]])
        rows_found = cursor.fetchall()
    except (Exception, psycopg2.Error) as error :
        print ("Error: ", error)
        return None
    finally:
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

    if len(rows_found) > 0:
        return None
    
    try:
        generation_process = "<ul>"
        confidence_score = check_category(event, confidence_score)
        generation_process += "<li>Event Category is in " + event['category'] + "</li>"
        confidence_score = use_ml(event, confidence_score)
        confidence_score, flag_description = use_nlp(event, confidence_score)
        if flag_description:
            generation_process += "<li>Event Description mentioned use of music</li>"

        relevant_tweets = get_music_tweets_query(event['title'])
        confidence_score += (5 * len(relevant_tweets))
        if len(relevant_tweets) > 0:
            generation_process += "<li>{} Relevant tweets found.</li>".format(len(relevant_tweets))

        generation_process += '</ul>'

    except Exception as e: 
        return e

    if confidence_score < 0:
        return None
    elif 0 < confidence_score and confidence_score <= 40:
        return {'confidence': 'Low', 'tweets': relevant_tweets, 'generation_process': generation_process}
    elif 40 < confidence_score and confidence_score <= 70:
        return {'confidence': 'Medium', 'tweets': relevant_tweets, 'generation_process': generation_process}
    elif 70 < confidence_score:
        return {'confidence': 'High', 'tweets': relevant_tweets, 'generation_process': generation_process}

def insert_lead(event):
    try:
        connection = psycopg2.connect(os.environ['DATABASE_URL'])
        cursor = connection.cursor()
        lead_id = event['id']
        results = check_confidence(event)
        if not results is None and not isinstance(results, Exception):
            dt = datetime.now()
            date_year = str(dt.year)
            date_month = str(dt.month)
            print('Inserting...' + event['title'])
            cursor.execute("INSERT INTO leads VALUES (%s, %s, %s, %s, NULL, 'SOCAN', 'No Status', %s, %s, %s)", [lead_id, json.dumps(event), results['confidence'], dt, date_year, date_month, results['generation_process']] )
            connection.commit()
            for tweet in results['tweets']:
                cursor.execute("INSERT INTO tweets VALUES (%s, %s, %s, %s)", [tweet["id"], tweet["text"], tweet["created_at"], lead_id])
                connection.commit()
            return results
        else:
            return str(results)
    except (Exception, psycopg2.Error) as error :
        print ("Error: ", error)
    finally:
        if(connection):
            cursor.close()
            connection.commit()
            connection.close()
            print("PostgreSQL connection is closed")

        
if __name__ == "__main__":
    potential_events = get_events()
    for event in potential_events:
        insert_lead(event)