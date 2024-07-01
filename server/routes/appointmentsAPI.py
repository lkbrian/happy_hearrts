from config import db
from flask_restful import Resource
from models import Appointment
from flask import make_response,jsonify, request
from sqlalchemy.exc import IntegrityError
from datetime import date,datetime

class appointmentsAPI(Resource):
    def get(self,id=None):
        if id is None:
            appointments= [a.to_dict() for a in Appointment.query.all()]
            response = make_response(jsonify(appointments),200)
            return response
        else :
            appointment = Appointment.query.filter_by(parent_id=id).first()
            response = make_response(jsonify(appointment),200)
            return response

    def post(self):
        data = request.json
        if not data:
            return make_response(jsonify({"msg": "No input provided"}), 400)
        appointment_date = datetime.strptime(data["appointment_date"], "%Y/%m/%d").date()
        if appointment_date < date.today():
            return make_response(jsonify({"msg":"Enter a date later than today or today"}),400)
        try:
            appointment = Appointment(
                child_id=data['child_id'],
                provider_id=data['provider_id'],
                appointment_date=appointment_date,
            )
            db.session.add(appointment)
            db.session.commit()
            return make_response(jsonify({"msg": "Appointment created successfully"}), 201)

        except IntegrityError:
            db.session.rollback()
            return jsonify({"msg": "Integrity constraint failed"}), 400

        except Exception as e:
            return jsonify({"msg": str(e)}), 500

    def patch(self,id):
        data=request.json
        if not data:
            return make_response(jsonify({"msg": "No input provided"}), 400)

        appointment = Appointment.query.filter_by(id=id).first()
        if not appointment:
            return make_response(jsonify({"msg":"Appointment doesn't exist"}),404)

        try:
            for field,value in data.items():
                if hasattr(appointment,field):
                    setattr(appointment,field,value)
            db.session.commit()
            return make_response(jsonify({"msg":"Appointment updated succesfully"}),201)
        except IntegrityError:
            db.session.rollback()
            return jsonify({"msg": "Integrity constraint failed"}), 400

        except Exception as e:
            return jsonify({"msg": str(e)}), 500

    def delete(self,id):
        appointment = Appointment.query.filter_by(id=id).first()
        if not appointment:
            return make_response(jsonify({"msg":"Appointment doesn't exist"}),404)
        db.session.delete(appointment)
        return make_response(jsonify({"msg":"Appointment deleted sucesfully"}),200)
