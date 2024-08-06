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


class Record(db.Model, SerializerMixin):
    __tablename__ = "records"
    serialize_rules = (
        "record_id",
        "child_id",
        "vaccine_id",
        "provider_id",
        "timestamp",
        "info",
        "-vaccine",
        "-child",
        "-provider",
    )
    record_id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey("children.child_id"), nullable=False)
    vaccine_id = db.Column(
        db.Integer, db.ForeignKey("vaccines.vaccine_id"), nullable=False
    )
    provider_id = db.Column(
        db.String, db.ForeignKey("providers.provider_id"), nullable=False
    )
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    child = db.relationship("Child", back_populates="vaccination_records")
    vaccine = db.relationship("Vaccine", back_populates="vaccination_records")
    provider = db.relationship("Provider", back_populates="vaccination_records")

    @hybrid_property
    def info(self):
        return {
            "child": self.child.fullname,
            "provider": self.provider.name,
            "vaccine": self.vaccine.name,
        }
