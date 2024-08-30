from flask_restful import Resource
from flask import request, jsonify, make_response
from models import Medications
from config import db
from sqlalchemy.exc import IntegrityError


class MedicationsAPI(Resource):
    def get(self, id=None):
        if id is None:
            medications = [med.to_dict() for med in Medications.query.all()]
            return make_response(jsonify(medications), 200)
        else:
            medication = Medications.query.filter_by(medication_id=id).first()
            if not medication:
                return jsonify({"msg": "Medication not found"}), 404
            return make_response(jsonify(medication.to_dict()), 200)

    def post(self):
        data = request.json
        if not data:
            return make_response(jsonify({"msg": "No input provided"}), 400)

        try:
            medication = Medications(
                name=data.get("name"),
                size_in_mg=data.get("size_in_mg"),
                dose_in_mg=data.get("dose_in_mg"),
                route=data.get("route"),
                dose_per_day=data.get("dose_per_day"),
                referral=data.get("referral"),
                provider_id=data["provider_id"],
                parent_id=data["parent_id"],
            )
            db.session.add(medication)
            db.session.commit()
            return make_response(
                jsonify({"msg": "Medication created successfully"}), 201
            )

        except IntegrityError:
            db.session.rollback()
            return jsonify({"msg": "Integrity constraint failed"}), 400

        except Exception as e:
            return jsonify({"msg": str(e)}), 500

    def patch(self, id):
        data = request.json
        if not data:
            return jsonify({"msg": "No input provided"})

        medication = Medications.query.filter_by(medication_id=id).first()
        if not medication:
            return jsonify({"msg": "Medication not found"})

        try:
            for field, value in data.items():
                if hasattr(medication, field):
                    setattr(medication, field, value)
            db.session.commit()
            return make_response(
                jsonify({"msg": "Medication updated successfully"}), 200
            )

        except IntegrityError:
            db.session.rollback()
            return jsonify({"msg": "Integrity constraint failed"}), 400

        except Exception as e:
            return jsonify({"msg": str(e)}), 500

    def delete(self, id):
        medication = Medications.query.filter_by(medication_id=id).first()
        if not medication:
            return jsonify({"msg": "Medication not found"})
        db.session.delete(medication)
        db.session.commit()
        return make_response(jsonify({"msg": "Medication deleted successfully"}), 200)
