from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property


class Appointment(db.Model, SerializerMixin):
    __tablename__ = "appointments"
    serialize_only=("appointment_id","child_id","provider_id","appointment_date","timestamp","info")
    appointment_id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey("children.child_id"), nullable=False)
    provider_id = db.Column(
        db.Integer, db.ForeignKey("providers.provider_id"), nullable=False
    )
    appointment_date = db.Column(db.DateTime, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    child = db.relationship("Child", back_populates="appointments")
    provider = db.relationship("Provider", back_populates="appointments")

    @hybrid_property
    def info(self):
        return {
            "child_name": self.child.fullname,      
            "provider_name": self.provider.name,      
        }
