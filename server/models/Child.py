from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property


class Child(db.Model, SerializerMixin):
    __tablename__ = "children"
    serialize_only = (
        "child_id",
        "fullname",
        "certificate_No",
        "date_of_birth",
        "age",
        "gender",
        "passport",
        "vaccination_records",
        "appointments",
        "parent_info",
    )
    serialize_rules = ("-parent_id", "-vaccination_records.child", "-appointments.child")
    child_id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String, nullable=False)
    certificate_No = db.Column(db.Integer, unique=True, nullable=False)
    date_of_birth = db.Column(db.DateTime, nullable=False)
    age = db.Column(db.String, nullable=True)
    gender = db.Column(db.String, nullable=False)
    passport = db.Column(db.String, nullable=False)
    parent_id = db.Column(
        db.Integer, db.ForeignKey("parents.parent_id"), nullable=False
    )

    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    parent = db.relationship("Parent", back_populates="children")
    vaccination_records = db.relationship(
        "Record", back_populates="child", cascade="all, delete-orphan"
    )
    appointments = db.relationship(
        "Appointment", back_populates="child", cascade="all, delete-orphan"
    )

    @hybrid_property
    def parent_info(self):
        return {
            "parent_id": self.parent.parent_id,
            "name": self.parent.name,
            "email": self.parent.email,
            "role": self.parent.role,
            "national_id": self.parent.national_id,
            "phone_number": self.parent.phone_number,
            "gender": self.parent.gender,
            "passport": self.parent.passport,
            "timestamp": self.parent.timestamp,
        }
