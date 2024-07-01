from flask_restful import Resource
from flask import jsonify,make_response,request
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity,unset_jwt_cookies
from models import User,Provider,Parent

class Login(Resource):
    def post(self):
        data = request.json
        if not data:
            return {"msg": "No Input was provided"}        

        email=data['email']
        password = data['password']

        user = (
            User.query.filter_by(email=email).first()
            or Provider.query.filter_by(email=email).first()
            or Parent.query.filter_by(email=email).first()
        )
        if not user:
            return make_response(jsonify({"msg": "Account doesn't exist"}), 404)
        elif user and user.check_password(password):
            token = create_access_token(
                identity={"email": user.email, "role": user.role, "id": user.user_id}
            )
            response = make_response(jsonify({"token": token,"user_id": user.user_id,"user":user.to_dict()}),200)
            return response
        return jsonify({"message": "Invalid user cridentials"}), 401


class Logout(Resource):
    @jwt_required
    def delete(self):
        current_user = get_jwt_identity
        response = make_response(
            jsonify({"message": f"Logged out user {current_user}"}), 200
        )
        unset_jwt_cookies(response)
        return response
