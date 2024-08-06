from datetime import datetime

from config import db
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import check_password_hash, generate_password_hash


class Parent(db.Model, SerializerMixin):
    __tablename__ = "parents"
    serialize_rules = ("-password_hash", "-children.parent_info")

    parent_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(70), nullable=False, unique=True)
    role = db.Column(db.String, default="parent", nullable=False)
    national_id = db.Column(db.Integer, unique=True, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False, unique=True)
    gender = db.Column(db.String, nullable=False)
    marital_status = db.Column(db.String, nullable=True, default="")
    address = db.Column(db.String, nullable=True, default="")
    occupation = db.Column(db.String, nullable=True, default="")
    passport = db.Column(
        db.String,
        nullable=False,
        default="https://res.cloudinary.com/dg6digtc4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1722952459/profile_xkjsxh.jpg",
    )
    password_hash = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    children = db.relationship(
        "Child", back_populates="parent", cascade="all, delete-orphan"
    )
    present_pregnacy = db.relationship(
        "Present_pregnancy", back_populates="parent", cascade="all,delete-orphan"
    )
    previous_pregnancy = db.relationship(
        "Previous_pregnancy", back_populates="parent", cascade="all,delete-orphan"
    )

    payments = db.relationship(
        "Payment", back_populates="parent", cascade="all, delete-orphan"
    )
    medications = db.relationship("Medications", back_populates="parent")

    medical_info_parent = db.relationship(
        "Medical_info_parent", back_populates="parent",cascade="all,delete-orphan"
    )

    delivery = db.relationship(
        "Delivery", back_populates="parent", cascade="all, delete-orphan"
    )

    discharge_summaries = db.relationship(
        "Discharge_summary", back_populates="parent"
    )
    reset_tokens = db.relationship("ResetToken", back_populates="parent")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Delivery(db.Model, SerializerMixin):
    __tablename__ = "deliveries"
    delivery_id = db.Column(db.Integer, primary_key=True)
    mode_of_delivery = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    duration_of_labour = db.Column(db.String, nullable=False)
    hours = db.Column(db.Integer, nullable=False)
    condition_of_mother = db.Column(db.String, nullable=False)
    condition_of_baby = db.Column(db.String, nullable=False)
    birth_weight_at_birth = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    vitamin_A = db.Column(db.String, nullable=True)

    conducted_by = db.Column(db.Integer, db.ForeignKey("providers.provider_id"))

    provider = db.relationship("Provider", back_populates="deliveries")
    

    parent_id = db.Column(db.Integer, db.ForeignKey("parents.parent_id"))

    parent = db.relationship("Parent", back_populates="delivery")


class Discharge_summary(db.Model, SerializerMixin):
    __tablename__ = "discharge_summaries"
    discharge_id = db.Column(db.Integer, primary_key=True)
    adimission_date = db.Column(db.DateTime, nullable=False)
    discharge_date = db.Column(db.DateTime, nullable=False)
    discharge_dignosis = db.Column(db.String, nullable=False)
    procedure = db.Column(db.String, nullable=True)

    conducted_by = db.Column(db.Integer, db.ForeignKey("providers.provider_id"))

    provider = db.relationship("Provider", back_populates="discharge_summaries")

    parent_id = db.Column(db.Integer, db.ForeignKey("parents.parent_id"))

    parent = db.relationship("Parent", back_populates="discharge_summaries")


class Medical_info_parent(db.Model, SerializerMixin):
    __tablename__ = "parents_medical_info"
    history_id = db.Column(db.Integer, primary_key=True)
    blood_transfusion = db.Column(db.String, nullable=True)
    family_history = db.Column(db.String, nullable=True)
    twins = db.Column(db.String, nullable=True)
    tuberclosis = db.Column(db.String, nullable=True)
    diabetes = db.Column(db.String, nullable=True)
    hypertension = db.Column(db.String, nullable=True)

    parent_id = db.Column(db.Integer, db.ForeignKey("parents.parent_id"))

    parent = db.relationship("Parent", back_populates="medical_info_parent")


class Medications(db.Model, SerializerMixin):
    __tablename__ = "discharge_medications"

    medication_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    size_in_mg = db.Column(db.Integer, nullable=True)
    dose_in_mg = db.Column(db.Integer, nullable=True)
    route = db.Column(db.String, nullable=True)
    dose_per_day = db.Column(db.String, nullable=True)
    referral = db.Column(db.String, nullable=True)

    conducted_by = db.Column(db.Integer, db.ForeignKey("providers.provider_id"))

    provider = db.relationship("Provider", back_populates="medications")

    parent_id = db.Column(db.Integer, db.ForeignKey("parents.parent_id"))

    parent = db.relationship("Parent", back_populates="medications")


class Present_pregnancy(db.Model, SerializerMixin):
    __tablename__ = "present_pregnancies"

    pp_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    weight_in_kg = db.Column(db.Integer, nullable=False)
    urinalysis = db.Column(db.String, nullable=False)
    blood_pressure = db.Column(db.String, nullable=False)
    pollar = db.Column(db.String, nullable=False)
    maturity_in_weeks = db.Column(db.Integer, nullable=False)
    fundal_height = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.String, nullable=False)
    clinical_notes = db.Column(db.String, nullable=False)

    parent_id = db.Column(db.Integer, db.ForeignKey("parents.parent_id"))

    parent = db.relationship("Parent", back_populates="present_pregnacy")


class Previous_pregnancy(db.Model, SerializerMixin):
    __tablename__ = "previous_pregnancies"

    pp_id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    maturity = db.Column(db.String, nullable=False)
    duration_of_labour = db.Column(db.String, nullable=False)
    type_of_delivery = db.Column(db.String, nullable=False)
    Weight_in_kg = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String, nullable=False)
    fate = db.Column(db.String, nullable=False)
    peurperium = db.Column(db.String, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("parents.parent_id"))

    parent = db.relationship("Parent", back_populates="previous_pregnancy")
