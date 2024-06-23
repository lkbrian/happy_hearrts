from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime


class Vaccine(db.Model, SerializerMixin):
    __tablename__ = "vaccines"
    vaccine_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    composition = db.Column(db.String, nullable=False)
    schedule = db.Column(db.String, nullable=False)
    indication = db.Column(db.String, nullable=False)
    side_effects = db.Column(db.String, nullable=False)
    info = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    vaccination_records = db.relationship(
        "Record", back_populates="vaccine", cascade="all, delete-orphan"
    )
