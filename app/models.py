from flask_sqlalchemy import SQLAlchemy
from app import application
from flask_login import UserMixin

db = SQLAlchemy(application)


class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

    def get_name(self):
        return "Paul Dirac"  # typically the user's name

