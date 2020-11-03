import os
import psycopg2
from psycopg2.extras import RealDictCursor
import bcrypt
from data.find_leads import insert_lead

class DbClient:

    def __init__(self, url):
        self.url = url

    def get_accounts(self):
        rows = self.query("SELECT username FROM account")
        return rows

    def get_leads(self):
        rows = self.query("SELECT id, details, confidence, revenue, date_added, status, year_added, month_added, saved FROM leads order by DATE_ADDED asc;", json=True)
        return rows

    def get_lead_by_id(self, id):
        row = self.query("SELECT id, details, confidence, revenue, date_added, status, year_added, month_added, saved FROM leads  where id = %s", parameters=[id], json=True)
        return row

    def get_tweets_for_lead(self, id):
        rows = self.query("SELECT tweet, date_created from tweets where lead_id = %s", parameters=[id], json=True)
        return rows

    def get_generation_process_for_lead(self, id):
        rows = self.query("SELECT generation_process from leads where id = %s", parameters=[id], json=True)
        return rows[0]

    def update_lead_status(self, id, status):
        value = self.update("update LEADS set status=%s where id =%s;", parameters=[status, id], json=True)
        return value
    
    def update_lead_save_status(self, id, saved):
        value = self.update("update LEADS set saved=%s where id =%s;", parameters=[saved, id], json=True)
        return value

    def hashed_password(self, password):
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password, salt)

    def insert_user(self, email, password, first_name, last_name, pro):
        hashed_password = self.hashed_password(password.encode('utf8')).decode('utf8')
        user = self.update("INSERT INTO account (hashed_password, email, first_name, last_name, pro) VALUES (%s, %s, %s, %s, %s);", parameters=[hashed_password, email, first_name, last_name, pro], json=True)
        return user

    def get_user_by_email(self, email):
        user = self.query("SELECT * from account where email = %s", parameters=[email], json=True)
        return user[0]

    def update_user_by_email(self, email, first_name, last_name):
        value = self.update("update account set first_name=%s, last_name=%s where email =%s;", parameters=[first_name, last_name, email], json=True)
        return value

    def update_revenue_by_lead(self, id, revenue):
        value = self.update("update leads set revenue=%s where id=%s;", parameters=[revenue, id], json=True)
        return value

    def insert_lead_details(self, data):
        value = insert_lead(data)
        print(value)
        return value

    def get_user_with_email_and_password(self, email, password):
        print(email)
        user = self.query("SELECT * from account where email = %s", parameters=[email], json=True)
        if len(user) > 0:
            user_dict = dict(user[0])
            if user_dict and bcrypt.checkpw(password.encode('utf8'), user_dict['hashed_password'].encode('utf8')):
                return user_dict
            else:
                return None

    def query(self, query, parameters=[], json=False):
        try:
            connection = psycopg2.connect(self.url)
            if json:
                cursor = connection.cursor(cursor_factory=RealDictCursor)
            else:
                cursor = connection.cursor()
            if parameters:
                cursor.execute(query, parameters)
            else:
                cursor.execute(query)
            rows = cursor.fetchall()
            return rows

        except (Exception, psycopg2.Error) as error :
            print ("Error while connecting to PostgreSQL", error)
        finally:
            #closing database connection.
                if(connection):
                    cursor.close()
                    connection.close()

    def update(self, query, parameters=[], json=False):
        try:
            connection = psycopg2.connect(self.url)
            cursor = connection.cursor()
            if parameters:
                cursor.execute(query, parameters)
            else:
                cursor.execute(query)

            return True
        except (Exception, psycopg2.Error) as error :
            print ("Error while connecting to PostgreSQL", error)
            return False
        finally:
            #closing database connection.
                if(connection):
                    connection.commit()
                    cursor.close()
                    connection.close()



if __name__ == "__main__":
    db_client = DbClient(os.environ["DATABASE_URL"])
    # db_client.insert_user('chen@socan.com', 'password', 'Chen', 'Zhang', 'SOCAN')
    print(db_client.get_user_with_email_and_password('chen@socan.com', 'passwsasord'))

