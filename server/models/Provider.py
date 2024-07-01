from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class Provider(db.Model, SerializerMixin):
    __tablename__ = "providers"
    serialize_rules = (
        "-password_hash",
        "-appointments.provider",
        "-vaccination_records.provider" ,
        "-vaccination_records.child",
    )

    provider_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(70), nullable=False, unique=True)
    role = db.Column(db.String, default="provider", nullable=False)
    national_id = db.Column(db.Integer, unique=True, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False, unique=True)
    gender = db.Column(db.String, nullable=False)
    passport = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    appointments = db.relationship(
        "Appointment", back_populates="provider", cascade="all, delete-orphan"
    )
    vaccination_records = db.relationship(
        "Record", back_populates="provider", cascade="all, delete-orphan"
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
