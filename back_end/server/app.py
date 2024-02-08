import sys
sys.path.append('../')

from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from scraper.main_scraper import scraper
from datetime import date
from flask import send_file
from glob import glob
from io import BytesIO
from zipfile import ZipFile
import os
from dotenv import dotenv_values
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, User, Scrape

app = Flask(__name__)

config = dotenv_values(".env")
app.secret_key = config['FLASK_SECRET_KEY']
# # NEED SECRET KEY PAGE
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
migrate = Migrate(app, db)
CORS(app)
db.init_app(app)

bcrypt = Bcrypt(app)

@app.get('/')
def index():
    return "Hello world"

#account authentication
@app.get('/api/user')
def check_logged_in_user():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return user.to_dict()
    else:
        return {'message': '401: Not Authorized'}, 401

#account creation
@app.post('/api/new_account')
def create_new_account():
    try:
        data = request.json
        password_hash = bcrypt.generate_password_hash(data.get("password"))
        new_user = User(username = data.get("username"), password_hash = password_hash)
        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        return new_user.to_dict(), 201
    except Exception as e:
        print(e)
        return {"Error": "something went wrong"}, 404

#account login
@app.post('/api/login')
def login_user():
    try:
        data = request.json
        user = User.query.filter(User.username == data.get('username')).first()
        if bcrypt.check_password_hash(user.password_hash, data.get('password')):
            session['user_id'] = user.id
            return user.to_dict(), 201
        else:
            return {"Error": "user not found"}, 404
    
    except Exception as e:
        print(e)
        return {"Error": "something went wrong"}, 404

#account logout
@app.delete('/api/logout')
def logout_user():
    session['user_id'] = None
    return {'message': '204: No Content'}, 204

#scrape
@app.post('/api/scraper')
def scrape_by_url():
    print("post")
    try:
        data = request.json
        new_scrape = Scrape(url = data.get("url"), date = date.today(), user_id = 1)
        db.session.add(new_scrape)
        db.session.commit()
        # scraper(new_scrape.url)

        # os.remove("screenshot.png")

        target = '/Users/ethanhessler/Development/Code/phase-5/phase-5-project/pixel_harvester2.0/back_end/server/'

        stream = BytesIO()
        files = []
        with ZipFile(stream, 'w') as zf:
            for file in glob(os.path.join(target, '*.png')):
                files.append(file)
                zf.write(file, os.path.basename(file))
        stream.seek(0)

        # for file in files:
        #     os.remove(file)

        return send_file(
            stream,
            as_attachment=True,
            download_name='archive.zip'
            )

    except Exception as e:
        print(e)
        return {"error": "Scrape did not go through"}
    



if __name__ == '__main__':
    app.run(port=5555, debug=True)

# curl -X POST -H "Content-Type:application/json" -d '{"url": "https://www.nike.com/w/socks-7ny3q"}' localhost:5555/scrape
