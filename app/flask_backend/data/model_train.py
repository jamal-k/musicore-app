import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from keras import Sequential
from keras.layers import Dense
import psycopg2
import os
import json
from keras.utils import to_categorical
import tensorflow as tf
from data.utils import single_pt_haversine

tf.logging.set_verbosity(tf.logging.INFO)

def label_fix(label):
    if label=='Successful':
        return 1
    else:
        return 0

def category_fix(label):
    if label=='Successful':
        return 1
    else:
        return 0

from math import radians, cos, sin, asin, sqrt

try:
    connection = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = connection.cursor()
    cursor.execute("select id, details->'title' as title, details->'rank' as rank, details->'category' as category, details->'location'->>0 as lat, details->'location'->>1 as lng, status from leads where status = 'Successful' or status = 'Unsuccessful';")
    rows_found = cursor.fetchall()
    dataset = pd.DataFrame.from_records(rows_found, columns=['id', 'title', 'rank', 'category', 'lat', 'lng', 'status'])

    dataset['status'] = dataset['status'].apply(label_fix)
    
    dataset['harvesine_distance'] = [single_pt_haversine(lat, lng) for lat, lng in zip(dataset.lat, dataset.lng)]

    categorical_features_category = tf.feature_column.categorical_column_with_hash_bucket("category", hash_bucket_size=50)
    categorical_feature_category_emb = tf.feature_column.embedding_column(categorical_column=categorical_features_category, dimension=3)
    rank = tf.feature_column.numeric_column("rank")
    harvesine_distance = tf.feature_column.numeric_column("harvesine_distance")
    
    x_data = dataset.drop(['id', 'title', 'lat', 'lng','status'],axis=1)
    y_labels = dataset['status']

    X_train, X_test, y_train, y_test = train_test_split(x_data,y_labels,test_size=0.3,random_state=101)

    
    input_func=tf.estimator.inputs.pandas_input_fn(x=X_train,
                                               y=y_train,
                                               batch_size=10,
                                               num_epochs=None,
                                               shuffle=True)

    model = tf.estimator.DNNClassifier(
        feature_columns=[rank, categorical_feature_category_emb, harvesine_distance],
        hidden_units=[1024, 512, 256], model_dir='./models')


    model.train(input_fn=input_func,steps=5000)

    from sklearn.metrics import classification_report
    eval_input_func = tf.estimator.inputs.pandas_input_fn(x=X_test,y=y_test,batch_size=len(X_test),shuffle=False)
    results = model.evaluate(eval_input_func)
    print(results)
    
except (Exception, psycopg2.Error) as error :
    print ("Error: ", error)
finally:
    if(connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
