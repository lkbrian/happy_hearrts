from flask import jsonify, make_response, request
from flask_restful import Resource
from models import Delivery, Parent, Provider
from config import db
from sqlalchemy.exc import IntegrityError
from datetime import datetime


class DeliveryAPI(Resource):
    def get(self, id=None):
        if id is None:
            deliveries = [d.to_dict() for d in Delivery.query.all()]
            return make_response(jsonify(deliveries), 200)
        else:
            delivery = Delivery.query.filter_by(delivery_id=id).first()
            if not delivery:
                return make_response(jsonify({"msg": "Delivery not found"}), 404)
            return make_response(jsonify(delivery.to_dict()), 200)

    def post(self):
        data = request.json
        if not data:
            return make_response(jsonify({"msg": "No input provided"}), 400)
        parent = Parent.query.get(data.get("parent_id"))
        provider = Provider.query.get(data.get("provider_id"))

        if not parent:
            return make_response(jsonify({"msg": "Parent not found"}), 404)

        if not provider:
            return make_response(jsonify({"msg": "Provider not found"}), 404)
        try:
            delivery = Delivery(
                mode_of_delivery=data["mode_of_delivery"],
                date=datetime.strptime(data["date"], "%Y-%m-%d %H:%M"),
                duration_of_labour=data["duration_of_labour"],
                condition_of_mother=data["condition_of_mother"],
                condition_of_baby=data["condition_of_baby"],
                birth_weight_at_birth=data["birth_weight_at_birth"],
                gender=data["gender"],
                parent_id=data["parent_id"],
                provider_id=data["provider_id"],
            )
            db.session.add(delivery)
            db.session.commit()

            return make_response(jsonify({"msg": "Delivery created successfully"}), 201)

        except IntegrityError:
            db.session.rollback()
            return make_response(jsonify({"msg": "Integrity constraint failed"}), 400)

        except Exception as e:
            return make_response(jsonify({"msg": str(e)}), 500)

    def patch(self, id):
        data = request.json
        if not data:
            return make_response(jsonify({"msg": "No input provided"}), 400)

        delivery = Delivery.query.filter_by(delivery_id=id).first()
        if not delivery:
            return make_response(jsonify({"msg": "Delivery not found"}), 404)

        try:
            for field, value in data.items():
                if field == "date":
                    try:
                        value = datetime.strptime(value, "%Y-%m-%d %H:%M")
                    except ValueError:
                        return make_response(jsonify({"msg": f"Invalid date format for {field}, should be YYYY-MM-DD HH:MM"}),400,)

                elif field == "parent_id":
                    parent = Parent.query.get(value)
                    if not parent:
                        return make_response(jsonify({"msg": "Parent not found"}), 404)
            
                elif field == "provider_id":
                    provider = Provider.query.get(value)
                    if not provider:
                        return make_response(jsonify({"msg": "Provider not found"}), 404)
                
                if hasattr(delivery, field):
                    setattr(delivery, field, value)

            db.session.commit()
            return make_response(jsonify({"msg": "Delivery updated successfully"}), 200)

        except Exception as e:
            return make_response(jsonify({"msg": str(e)}), 500)

    def delete(self, id):
        delivery = Delivery.query.filter_by(delivery_id=id).first()

        if not delivery:
            return jsonify({"msg": "Delivery not found"})
        db.session.delete(delivery)
        db.session.commit()

        return make_response(jsonify({"msg": "Delivery deleted successfully"}), 200)
