from flask_restful import Resource, reqparse, request
from models.user import User as UserModel
import json
import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

class Signup(Resource):

    def post(self):
        docter = request.args.get("docter")

        parser = reqparse.RequestParser()
        parser.add_argument("first_name", type=str, required=True, help="first_name is required")
        parser.add_argument("last_name", type=str, required=True, help="last_name is required")
        parser.add_argument("age", type=int, required=True, help="age is required")
        parser.add_argument("gender", type=str, required=True, help="gender is required")
        parser.add_argument("password", type=str, required=True, help="password is required")

        if docter == "true":

            return {"error": False, "data": "doctor to be added in future"}

        else:
            parser.add_argument("mobile_number", type=str, required=True, help="mobile_number is required")

            args = parser.parse_args()

            args["password"] = bcrypt.hashpw(
                args["password"].encode("utf-8"), bcrypt.gensalt()
            ).decode("utf-8")

            response = UserModel.add_user(args)
            if response["error"]:
                return response, 500

            user = response["data"]
            access_token = create_access_token(identity=user.mobile_number, expires_delta=False)

            return {"error": False, "data": json.loads(user.to_json()), "access_token": access_token}


class Login(Resource):

    def post(self):
        docter = request.args.get("docter")
        parser = reqparse.RequestParser()


        if docter == "true":

            return {"error": False, "data": "doctor to be added in future"}

        else:
            parser.add_argument("mobile_number", type=str, required=True, help="mobile_number is required")
            parser.add_argument("password", type=str, required=True, help="password is required")

            args = parser.parse_args()

            response = UserModel.get_user_by_mobile_number(args["mobile_number"])
            if response["error"]:
                return response, 404

            user = response["data"]

            passwordMatch = bcrypt.checkpw(
                args["password"].encode("utf-8"), user.password.encode("utf-8")
            )

            if not passwordMatch:
                return {"error": True, "message": "Invalid credentials"}, 401

            access_token = create_access_token(identity=user.mobile_number, expires_delta=False)

            return {"error": False, "data": json.loads(user.to_json()), "access_token": access_token}


class Secure(Resource):
    @jwt_required()
    def get(self):
        mobile_number = get_jwt_identity()
        return {"error": False, "data": mobile_number}


class GetUser(Resource):
    @jwt_required()
    def get(self):
        mobile_number = get_jwt_identity()

        response = UserModel.get_user_by_mobile_number(mobile_number=mobile_number)
        if response["error"]:
            return response, 500

        user = response["data"]

        return {"error": False, "data": json.loads(user.to_json())}


class UpdateUser(Resource):
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument("vata", type=str, required=True, help="vata is required")
        parser.add_argument("pitta", type=str, required=True, help="pitta is required")
        parser.add_argument("kapha", type=str, required=True, help="kapha is required")

        args = parser.parse_args()

        mobile_number = get_jwt_identity()

        response = UserModel.add_dosa(
            mobile_number=mobile_number,
            vata=args["vata"],
            pitta=args["pitta"],
            kapha=args["kapha"]
        )
        if response["error"]:
            return response, 500

        user = response["data"]

        return {"error": False, "data": json.loads(user.to_json())}