from flask_restful import Resource, reqparse
from models.user import User as UserModel
from models.doctor import Doctor as DoctorModel

class Share(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("documents", type=list, location="json", required=True, help="document id is required")
        args = parser.parse_args()

        response = UserModel.get_documents(mobile_number="9137357003")
        if response['error']:
            return response, 500
        
        documents = response['data']
        final_documents = []

        for document in args['documents']:
            for doc in documents:
                if doc['id'] == document:
                    final_documents.append(doc)

        for d in final_documents:
            response = DoctorModel.add_documents(mobile_number="9004690126", documents=d)
            if response['error']:
                return response, 500
        
        return {"error": False, "data": "success"}, 200
    
    def get(self):
        response = DoctorModel.get_documents(mobile_number="9004690126")
        if response['error']:
            return response, 500
        
        documents = response['data']
        
        return {"error": False, "data": documents}, 200
        