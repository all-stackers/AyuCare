from flask_restful import Resource, reqparse
from models.doctor import Doctor as DoctorModel
import json

class Doctor(Resource):
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=True, help="name is required")
        parser.add_argument("age", type=int, required=True, help="age is required")
        parser.add_argument("gender", type=str, required=True, help="gender is required")
        parser.add_argument("password", type=str, required=True, help="password is required")
        parser.add_argument("mobile_number", type=str, required=True, help="mobile_number is required")

        args = parser.parse_args()

        response = DoctorModel.add(args)
        if response["error"]:
            return response, 500
        
        doctor = response["data"]

        return {"error": False, "data": json.loads(doctor.to_json())}
    
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile_number", type=str, required=True, help="mobile_number is required")

        args = parser.parse_args()

        response = DoctorModel.get_by_mobile_number(args["mobile_number"])
        if response["error"]:
            return response, 500
        
        doctor = response["data"]

        return {"error": False, "data": json.loads(doctor.to_json())}
