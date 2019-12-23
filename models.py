# from flask_sqlalchemy import SQLAlchemy
# from application import application
#
#
# db = SQLAlchemy(application)
#
#
# class Users(db.Model):
#
#     __tablename__ = 'Users'
#
#     id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
#     username = db.Column('username', db.Integer)
#     password = db.Column('')
#
#
# class Blog(db.Model):
#
#     __tablename__ = 'Blog'
#
#     id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
#     date_created = db.Column('date', db.Date, primary_key=False)
#     post_content = db.Column('post_content', db.Text)
