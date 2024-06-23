from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime


class Appointment(db.Model, SerializerMixin):
    __tablename__ = "appointments"

    appointment_id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey("children.child_id"), nullable=False)
    provider_id = db.Column(
        db.Integer, db.ForeignKey("providers.provider_id"), nullable=False
    )
    appointment_date = db.Column(db.DateTime, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    child = db.relationship("Child", back_populates="appointments")
    provider = db.relationship("Provider", back_populates="appointments")
