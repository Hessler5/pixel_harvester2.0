import sys
sys.path.append('../')

from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Scrape
from scraper.main_scraper import scraper
from datetime import date
from flask import send_file
from glob import glob
from io import BytesIO
from zipfile import ZipFile
import os
from dotenv import dotenv_values
from flask_cors import CORS

app = Flask(__name__)

# config = dotenv_values(".env")
# app.secret_key = config['FLASK_SECRET_KEY']
# # NEED SECRET KEY PAGE
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
migrate = Migrate(app, db)
CORS(app)
db.init_app(app)

@app.get('/')
def index():
    return "Hello world"

#account creation
@app.post('/new_account')
def create_new_account():
    try:
        data = request.json
        new_user = User(username = data.get("username"), password = data.get("password"))
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201
    except:
        return {"Error": "something went wrong"}


#scrape
@app.post('/scraper')
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
