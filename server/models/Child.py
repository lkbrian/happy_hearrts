from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime


class Child(db.Model, SerializerMixin):
    __tablename__ = "children"

    child_id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String, nullable=False)
    certificate_No = db.Column(db.Integer, unique=True, nullable=False)
    date_of_birth = db.Column(db.DateTime, nullable=False)
    age = db.Column(db.String, nullable=True)
    gender = db.Column(db.String, nullable=False)
    passport = db.Column(db.String, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("parents.parent_id"))
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    parent = db.relationship("Parent", backref="children")
    vaccination_records = db.relationship(
        "Record", back_populates="child", cascade="all, delete-orphan"
    )
    appointments = db.relationship(
        "Appointment", back_populates="child", cascade="all, delete-orphan"
    )

    # def __init__(self, Fullname, Certificate_No, Date_Of_Birth, parent_id, Age=None):
    #     self.Fullname = Fullname
    #     self.Certificate_No = Certificate_No
    #     self.Date_Of_Birth = Date_Of_Birth
    #     self.Age = Age
    #     self.parent_id = parent_id

    def __repr__(self):
        return f"\nRegistered: {self.Fullname} of Age {self.Age} "
