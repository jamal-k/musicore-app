import os

import unittest
import json

os.environ["ENVIRONMENT"] = 'TEST'
import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir) 

from app import app
from unittest import mock
import db.dbclient
import flask
import uuid

def mocked_requests_get(*args, **kwargs):

    return {
    "count": 1,
    "overflow": False,
    "next": None,
    "previous": None,
    "results": [
        {
            "relevance": None,
            "id": "nCcrk867VFGbxcbYCx",
            "title": "Wendy Lands",
            "description": "",
            "category": "concerts",
            "labels": [
                "concert",
                "music"
            ],
            "rank": 11,
            "local_rank": 28,
            "entities": [
                {
                    "type": "venue",
                    "entity_id": "RAZ92wpVvf8vc68VSyXzZk",
                    "name": "Richmond Hill Centre for the Performing Arts",
                    "formatted_address": "10268 Yonge Street\nRichmond Hill, ON L4C 3B7\nCanada"
                }
            ],
            "duration": 0,
            "start": "2020-02-07T00:30:00Z",
            "end": "2020-02-07T00:30:00Z",
            "updated": "2020-01-31T00:45:48Z",
            "first_seen": "2019-06-13T23:16:35Z",
            "timezone": "America/Toronto",
            "location": [
                -79.438927,
                43.877386
            ],
            "scope": "locality",
            "country": "CA",
            "place_hierarchies": [
                [
                    "6295630",
                    "6255149",
                    "6251999",
                    "6093943",
                    "6185560",
                    "6122091"
                ],
                [
                    "6295630",
                    "6255149",
                    "6251999",
                    "6093943",
                    "6167865"
                ]
            ],
            "state": "active"
        }
    ]
}

def mocked_requests_json_put(*args, **kwargs):
    return {"status": "Contacted"}



class BasicTests(unittest.TestCase):
 
    ############################
    #### setup and teardown ####
    ############################
 
    # executed prior to each test
    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        app.config['DEBUG'] = False
        self.app = app.test_client()
 
    # executed after each test
    def tearDown(self):
        pass

    @mock.patch('db.dbclient.DbClient.get_leads', side_effect=mocked_requests_get)
    def test_api_leads_get_mock(self, mock_get):
        response = self.app.get('/api/leads', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    # Below are with seeded test database from setup.py
    def test_api_leads_get(self):
        response = self.app.get('/api/leads', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_generation_process_by_id(self):
        response = self.app.get('/api/leads/ztZPNvEXiT6TbVsAaT/generationprocess', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_update_status_by_lead(self):
        send = {"status": "Contacted"}
        response = self.app.put('/api/leads/ztZPNvEXiT6TbVsAaT/status',
                                data=json.dumps(send),
                                content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        
    def test_tweets_by_lead(self):
        response = self.app.get('/api/leads/ztZPNvEXiT6TbVsAaT/tweets',
                                content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_lead_by_id(self):
        response = self.app.get('/api/leads/ztZPNvEXiT6TbVsAaT', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_lead_by_id_none(self):
        response = self.app.get('/api/leads/sadsT', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.data)), 0)

    def test_update_lead_by_id_revenue(self):
        send = {"revenue": 200}
        response = self.app.put('/api/leads/ztZPNvEXiT6TbVsAaT/revenue',
                                data=json.dumps(send),
                                content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 200)


    def test_update_user_by_email(self):
        send = {"email": "chen@socan.com", "first_name": "new", "last_name": "test"}
        response = self.app.put('/api/user',
                                data=json.dumps(send),
                                content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    
    def test_insert_lead_details(self):
        send = {'id': uuid.uuid4().hex, 'start': '12:30', 'title': 'testingasdsas', 'rank': 50, 'category': 'test lead', 'description': '', 'entities': [{'name': 'hello', 'type': 'venue', 'formatted_address': '100 lee'}], 'location': [40, -20]}
        response = self.app.post('/api/leads',
                                data=json.dumps(send),
                                content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_login_fail(self):
        send = {'email': "test", "password": "test"}
        response = self.app.post('/api/token/auth',
                                data=json.dumps(send),
                                content_type='application/json', follow_redirects=True)
        self.assertEqual(response.status_code, 403)


        







if __name__ == "__main__":
    unittest.main()