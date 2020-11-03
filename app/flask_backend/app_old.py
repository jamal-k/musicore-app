from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import requests
import json
from requests_oauth2 import OAuth2BearerToken
import os
# from snips_nlu import SnipsNLUEngine
from dotenv import load_dotenv
from db.dbclient import DbClient
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

if 'ENVIRONMENT' in os.environ and os.environ['ENVIRONMENT'] == 'PRODUCTION':
    sentry_sdk.init(
        dsn=os.environ["SENTRY_DSN"],
        integrations=[FlaskIntegration()]
    )

app = Flask(__name__)

os.environ['ENVIRONMENT'] = 'PRODUCTION'
os.environ['FLASK_KEY'] = "1Agb7Asf12"
os.environ['DATABASE_URL'] = "postgres://nugygrdzvquvwo:d260e72bd509c5a837b80203bbf59ea2a67a1f4722d622d102c72aaeec162e7d@ec2-3-220-86-239.compute-1.amazonaws.com:5432/dfkmlf331gun4p"
os.environ['predicthq_token'] = "3E0iYliiukIAo_eyJ-tE0YknidGOcmzNoRZhQMGi"
os.environ['twitter_token'] = "AAAAAAAAAAAAAAAAAAAAAFd%2BCAEAAAAA0NzYMS3evpZrZFJoCkyYYOw0QNo%3DwpnzPNK6eBDEuODg6cmAyCMcIR8uK8CxhIX3ZkfGW1BLIbkuSB"
os.environ['REACT_APP_GOOGLE_MAPS_KEY'] = "AIzaSyCHxYpFOynqTylhP06iQG45crjlMMslBB4"
os.environ['SENTRY_DSN'] = "https://8f1b5ac60bc24a86af22d5e63f6f5030@o358880.ingest.sentry.io/3486022"

# This is just one aspect of security
# if 'ENVIRONMENT' in os.environ and os.environ['ENVIRONMENT'] == 'PRODUCTION':
#     CORS(app, resources={r"/tokens/*": {"origins": "https://musicore.herokuapp.com"}, r"/api/*": {"origins": "*"}})
# else:
CORS(app)

if 'ENVIRONMENT' in os.environ and os.environ['ENVIRONMENT'] == 'TEST':
    predicthq_token = ""
    twitter_token = ""
else:
    predicthq_token = os.environ['predicthq_token']
    twitter_token = os.environ['twitter_token']

# loaded_engine = SnipsNLUEngine.from_path("./nlp/model")
if 'DATABASE_URL' in os.environ:
    db_client = DbClient(os.environ["DATABASE_URL"])
else:
    print('Ensure you have a local test database setup and running from script/bootstrap')
    db_client = DbClient("postgresql://postgres:postgres@localhost:5432/test_musicore")

@app.route("/token/maps")
def get_maps_token():
    response = {"token": os.environ['REACT_APP_GOOGLE_MAPS_KEY']}
    
    return jsonify(response)

@app.route("/api/leads")
def get_leads():
    accounts = db_client.get_leads()
    return jsonify(accounts)

@app.route("/api/leads/<string:id>/generationprocess")
def get_generation_process_by_id(id):
    accounts = db_client.get_generation_process_for_lead(id)
    return jsonify(accounts)

@app.route("/api/leads/<string:id>")
def get_lead_by_id(id):
    lead = db_client.get_lead_by_id(id)
    return jsonify(lead)
    
@app.route("/api/tweets/<string:id>")
def get_tweets_by_id(id):
    accounts = db_client.get_tweets_for_lead(id)
    return jsonify(accounts)

@app.route("/test_location")
def test_location():
    return "Hello world!"

# @app.route("/api/get_token", methods=["POST"])
# def get_token():
#     incoming = request.get_json()
#     user = db_client.get_user_with_email_and_password(incoming["email"], incoming["password"])
#     if user:
#         return jsonify(token=generate_token(user))

#     return jsonify(error=True), 403




if __name__ == "__main__":
    app.run(debug=True)