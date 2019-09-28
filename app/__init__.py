from flask import Flask
import os

application = Flask(__name__)
application.config['SECRET_KEY'] = os.urandom(32)
application.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5432/personal_site'
application.config["BLOGGING_URL_PREFIX"] = "/blog"
application.config["BLOGGING_DISQUS_SITENAME"] = "test"
application.config["BLOGGING_SITEURL"] = "http://localhost:8000"
application.config["BLOGGING_SITENAME"] = "My Site"
application.config["BLOGGING_KEYWORDS"] = ["blog", "meta", "keywords"]
application.config["FILEUPLOAD_IMG_FOLDER"] = "fileupload"
application.config["FILEUPLOAD_PREFIX"] = "/fileupload"
application.config["FILEUPLOAD_ALLOWED_EXTENSIONS"] = ["png", "jpg", "jpeg", "gif"]

from app import routes