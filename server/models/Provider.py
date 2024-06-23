from config import db
from sqlalchemy_serializer import SerializerMixin


class Provider(db.Model, SerializerMixin):
    __tablename__ = "providers"

    provider_id = db.Column(
        db.Integer, db.ForeignKey("users.user_id"), primary_key=True
    )
    name = db.Column(db.String(70), nullable=False)
    national_id = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    passport = db.Column(db.String, nullable=False)

    __mapper_args__ = {"polymorphic_identity": "parent"}

    appointments = db.relationship(
        "Appointment", back_populates="provider", cascade="all, delete-orphan"
    )
    vaccination_records = db.relationship(
        "Record", back_populates="provider", cascade="all, delete-orphan"
    )
