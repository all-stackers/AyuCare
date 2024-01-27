from flask_restful import Resource, reqparse
from models.user import User as UserModel

class Documents(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('documents', type=list, location="json", required=True, help="Document is required")
        args = parser.parse_args()

        for document in args['documents']:
            response = UserModel.add_documents(mobile_number="9137357003", documents=document)
            if response['error']:
                return response, 500

        return {'document': args['documents']}, 200
    
    def get(self):
        response = UserModel.get_user_by_mobile_number(mobile_number="9137357003")
        if response['error']:
            return response, 500

        return {'documents': response['data']['documents']}, 200