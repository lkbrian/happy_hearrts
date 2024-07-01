from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property


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
