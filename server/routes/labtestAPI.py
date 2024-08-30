from flask_restful import Resource
from flask import request, jsonify, make_response
from models import LabTest,Child,Parent
from config import db
from sqlalchemy.exc import IntegrityError
from datetime import datetime


class LabTestAPI(Resource):

    # GET all lab tests or a single lab test by ID
    def get(self, id=None):
        if id is None:
            lab_tests = LabTest.query.all()
            lab_test_list = [lab_test.to_dict() for lab_test in lab_tests]
            return make_response(jsonify(lab_test_list), 200)
        else:
            lab_test = LabTest.query.get(id)
            if not lab_test:
                return make_response(jsonify({"msg": "Lab test not found"}), 404)
            return make_response(jsonify(lab_test.to_dict()), 200)

    def post(self):
        data = request.json
        if not data:
            return make_response(jsonify({"msg": "No input data provided"}), 400)

        parent_id = data.get("parent_id")
        child_certificate_no = data.get("child_certificate_no")

        if child_certificate_no:

            child = Child.query.filter_by(certificate_No=child_certificate_no).first()
            if not child:
                return make_response(jsonify({"msg": "Child not found"}), 404)
            

            try:
                test_date = datetime.strptime(data.get("test_date"), "%Y-%m-%d %H:%M")
                lab_test = LabTest(
                    test_name=data.get("test_name"),
                    test_date=test_date,
                    result=data.get("result"),
                    remarks=data.get("remarks"),
                    child_id=child.child_id,  # Associate the test with the child
                    parent_id=None  # Keep parent_id null when it's for a child
                )
                db.session.add(lab_test)
                db.session.commit()
                return make_response(jsonify({"msg": "Lab test for child created successfully"}), 201)

            except IntegrityError:
                db.session.rollback()
                return make_response(jsonify({"msg": "Integrity constraint failed"}), 400)

            except Exception as e:
                return make_response(jsonify({"msg": str(e)}), 500)

        elif not parent_id:
            parent = Parent.query.filter_by(parent_id=parent_id).first()
            if not parent:
                return make_response(jsonify({"msg": "Parent not found"}), 404)
            try:
                test_date = datetime.strptime(data.get("test_date"), "%Y-%m-%d %H:%M")
                lab_test = LabTest(
                    test_name=data.get("test_name"),
                    test_date=test_date,
                    result=data.get("result"),
                    remarks=data.get("remarks"),
                    parent_id=parent_id,  # Associate the test with the parent
                    child_id=None  # Keep child_id null when it's for a parent
                )
                db.session.add(lab_test)
                db.session.commit()
                return make_response(jsonify({"msg": "Lab test for parent created successfully"}), 201)

            except IntegrityError:
                db.session.rollback()
                return make_response(jsonify({"msg": "Integrity constraint failed"}), 400)

            except Exception as e:
                return make_response(jsonify({"msg": str(e)}), 500)

    # PATCH to update a lab test by ID
    def patch(self, id):
        lab_test = LabTest.query.get(id)
        if not lab_test:
            return make_response(jsonify({"msg": "Lab test not found"}), 404)

        data = request.json
        try:
            for key, value in data.items():
                if hasattr(lab_test, key):
                    if key == "test_date":
                        value = datetime.strptime(value, "%Y-%m-%d %H:%M")
                    setattr(lab_test, key, value)

            db.session.commit()
            return make_response(jsonify({"msg": "Lab test updated successfully"}), 200)

        except IntegrityError:
            db.session.rollback()
            return make_response(jsonify({"msg": "Integrity constraint failed"}), 400)

        except Exception as e:
            return make_response(jsonify({"msg": str(e)}), 500)

    # DELETE a lab test by ID
    def delete(self, id):
        lab_test = LabTest.query.get(id)
        if not lab_test:
            return make_response(jsonify({"msg": "Lab test not found"}), 404)

        try:
            db.session.delete(lab_test)
            db.session.commit()
            return make_response(jsonify({"msg": "Lab test deleted successfully"}), 200)

        except Exception as e:
            return make_response(jsonify({"msg": str(e)}), 500)
