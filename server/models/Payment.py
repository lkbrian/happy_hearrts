from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime


class Payment(db.Model, SerializerMixin):
    __tablename__ = "payments"
    payment_id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.String, db.ForeignKey("parents.parent_id"), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    payment_method = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    parent = db.relationship("Parent", back_populates="payments")
