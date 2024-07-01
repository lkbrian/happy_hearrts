from config import db
from flask_restful import Resource
from models import Record
from flask import make_response, jsonify, request
from sqlalchemy.exc import IntegrityError


class recordsApi(Resource):
    def get(self, id=None):
        if id is None:
            records = [r.to_dict() for r in Record.query.all()]
            response = make_response(jsonify(records), 200)
            return response
        else:
            record = Record.query.filter_by(parent_id=id).first()
            response = make_response(jsonify(record), 200)
            return response

    def post(self):
        data = request.json
        if not data:
            return make_response(jsonify({"msg": "No input provided"}), 400)

        try:
            record = Record(
                child_id=data["child_id"],
                provider_id=data["provider_id"],
                vaccine_id=data["vaccine_id"],
            )
            db.session.add(record)
            db.session.commit()
            return make_response(
                jsonify({"msg": "Record created successfully"}), 201
            )

        except IntegrityError:
            db.session.rollback()
            return jsonify({"msg": "Integrity constraint failed"}), 400

        except Exception as e:
            return jsonify({"msg": str(e)}), 500

    def patch(self, id):
        data = request.json
        if not data:
            return make_response(jsonify({"msg": "No input provided"}), 400)

        record = Record.query.filter_by(id=id).first()
        if not record:
            return make_response(jsonify({"msg": "Record doesn't exist"}), 404)

        try:
            for field, value in data.items():
                if hasattr(record, field):
                    setattr(record, field, value)
            db.session.commit()
            return make_response(
                jsonify({"msg": "Record updated succesfully"}), 201
            )
        except IntegrityError:
            db.session.rollback()
            return jsonify({"msg": "Integrity constraint failed"}), 400

        except Exception as e:
            return jsonify({"msg": str(e)}), 500

    def delete(self, id):
        record = Record.query.filter_by(id=id).first()
        if not record:
            return make_response(jsonify({"msg": "Record doesn't exist"}), 404)
        db.session.delete(record)
        return make_response(jsonify({"msg": "Record deleted sucesfully"}), 200)
