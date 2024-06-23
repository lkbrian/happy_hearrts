from config import db
from sqlalchemy_serializer import SerializerMixin
from .User import User


class Parent(User,SerializerMixin):
    __tablename__ = "parents"

    parent_id = db.Column(db.Integer,db.ForeignKey('users.user_id'), primary_key=True)
    parent_name = db.Column(db.String,nullable=False)
    national_id = db.Column(db.Integer, unique=True, nullable=False)
    gender = db.Column(db.String,nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'parent'
    }

    children = db.relationship("Child", back_populates="parent", cascade="all, delete-orphan")
    payments = db.relationship("Payment", back_populates="parent", cascade="all, delete-orphan")


    def __init__(self, Parent_name, National_ID):
        self.Parent_name = Parent_name
        self.National_ID = National_ID

