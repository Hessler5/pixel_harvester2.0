from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable = False)
    password_hash = db.Column(db.String, nullable = False)

    scrapes = db.relationship('Scrape', back_populates = 'user', cascade = 'all, delete-orphan')

    serialize_rules = ['-scrapes.user', '-password_hash']

    def __repr__(self):
        return f'<User {self.id}>'
    

class Scrape(db.Model, SerializerMixin):
    __tablename__ = 'scrapes'
    id = db.Column(db.Integer, primary_key = True)
    url = db.Column(db.String, nullable = False)
    date = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'scrapes')

    serialize_rules = ['-user.scrapes']

    def __repr__(self):
        return f'<Scrape {self.id}>'