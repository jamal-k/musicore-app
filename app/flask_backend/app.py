from flask import Flask, jsonify, abort, request, session
from flask_cors import CORS
import requests
import json
import os
from snips_nlu import SnipsNLUEngine
from dotenv import load_dotenv
from db.dbclient import DbClient
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
import jwt
from functools import wraps

app = Flask(__name__)

if 'ENVIRONMENT' in os.environ and os.environ['ENVIRONMENT'] == 'PRODUCTION':
    sentry_sdk.init(
        dsn=os.environ["SENTRY_DSN"],
        integrations=[FlaskIntegration()]
    )
    app.config['SECRET_KEY'] = os.environ['FLASK_KEY']
    app.config['LOGIN_REQUIRED'] = True


# This is just one aspect of security
# if 'ENVIRONMENT' in os.environ and os.environ['ENVIRONMENT'] == 'PRODUCTION':
#     CORS(app, resources={r"/tokens/*": {"origins": "https://musicore.herokuapp.com"}, r"/api/*": {"origins": "*"}})
# else:
CORS(app, resources={r"/*": {"origins": "*"}})

if 'ENVIRONMENT' in os.environ and os.environ['ENVIRONMENT'] == 'TEST':
    predicthq_token = ""
    twitter_token = ""
    app.config['LOGIN_REQUIRED'] = False
else:
    predicthq_token = os.environ['predicthq_token']
    twitter_token = os.environ['twitter_token']

loaded_engine = SnipsNLUEngine.from_path("./nlp/model")
if 'DATABASE_URL' in os.environ:
    db_client = DbClient(os.environ["DATABASE_URL"])
else:
    print('Ensure you have a local test database setup and running from script/bootstrap')
    db_client = DbClient("postgresql://postgres:postgres@localhost:5432/test_musicore")

def login_required(func):
    @wraps(func)
    def authenticate_and_call(*args, **kwargs):
        if app.config['LOGIN_REQUIRED']:
            if 'X-Access-Tokens' in request.headers:
                if not check_token(request.headers['X-Access-Tokens']):
                    return jsonify(token_is_valid=False), 403
            else:
                return jsonify(token_is_valid=False), 403
        return func(*args, **kwargs)
    return authenticate_and_call
    
@app.route("/api/token/maps")
@login_required
def get_maps_token():
    response = {"token": os.environ['REACT_APP_GOOGLE_MAPS_KEY']}
    return jsonify(response)

@app.route("/api/leads")
@login_required
def get_leads():
    accounts = db_client.get_leads()
    return jsonify(accounts)

@app.route("/api/leads/<string:id>/generationprocess")
@login_required
def get_generation_process_by_id(id):
    accounts = db_client.get_generation_process_for_lead(id)
    return jsonify(accounts)

@app.route("/api/leads/<string:id>/status", methods=['PUT'])
@login_required
def update_status_by_lead(id):
    result = db_client.update_lead_status(id, request.json['status'])
    return jsonify(result)

@app.route("/api/leads/<string:id>/save", methods=['PUT'])
@login_required
def update_lead_save_status(id):
    result = db_client.update_lead_save_status(id, request.json['saved'])
    return jsonify(result)

@app.route("/api/leads/<string:id>")
@login_required
def get_lead_by_id(id):
    lead = db_client.get_lead_by_id(id)
    return jsonify(lead)

@app.route("/api/leads/<string:id>/revenue", methods=['PUT'])
@login_required
def update_revenue_by_lead(id):
    lead = db_client.update_revenue_by_lead(id, request.json['revenue'])
    return jsonify(lead)
    
@app.route("/api/leads/<string:id>/tweets")
@login_required
def get_tweets_by_id(id):
    accounts = db_client.get_tweets_for_lead(id)
    return jsonify(accounts)


@app.route("/api/user/<string:email>")
@login_required
def get_user_by_email(email):
    user = db_client.get_user_by_email(email)
    return jsonify(user)

@app.route("/api/user", methods=['PUT'])
@login_required
def update_user_by_email():
    data = request.json
    result = db_client.update_user_by_email(data['email'], data['first_name'], data['last_name'])
    return jsonify(result)

@app.route("/api/leads", methods=['POST'])
@login_required
def insert_lead():
    data = request.json
    result = db_client.insert_lead_details(data)
    return jsonify(result)

@app.route('/api/token/auth', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = db_client.get_user_with_email_and_password(email, password)
    if user:
        payload = {
            'email': email
        }
        token = (jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')).decode('utf-8')
        resp = {login: True, 'token': token}
        return jsonify(resp)

    else:
        resp = {login: False}
        return jsonify(resp), 403

@app.route("/api/token/valid", methods=["POST"])
def is_token_valid():
    token = request.json['token']
    if check_token(token):
        return jsonify(token_is_valid=True), 200
    else:
        return jsonify(token_is_valid=False), 403

def check_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return True
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False



if __name__ == "__main__":
    app.run(debug=True)