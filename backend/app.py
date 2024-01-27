from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_restful import Api
from resources.user import (Signup, Login, Secure, GetUser, UpdateUser)
from resources.predictDisease import PredictDisease
from resources.medicine import Medicine
from resources.remedies import AyurvedicRemedies
from resources.AyurvedicDoshas import AyurvedicDoshas
from resources.ImageToItems import ImageToItems
from resources.Calories import Calories
from mongo_engine import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
from englisttohindi.englisttohindi import EngtoHindi

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config["JWT_SECRET_KEY"] = "all_stackers_going_to_win_hackathon"

jwt = JWTManager(app)

DB_URI = os.getenv("FLASK_MONGODB_URI")

app.config["MONGODB_HOST"] = DB_URI

db.init_app(app)

api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(GetUser, "/getUser")
api.add_resource(Secure, "/testingjwt")

api.add_resource(UpdateUser ,"/addDosa")

api.add_resource(PredictDisease, "/predictDisease")

api.add_resource(Medicine, "/getMedicineDetails")

api.add_resource(AyurvedicRemedies, "/getAyurvedicRemedies")

api.add_resource(AyurvedicDoshas, "/doshaTreatment")

api.add_resource(ImageToItems, '/imageToItems')

api.add_resource(Calories, '/calculateCalories')

@app.route('/translate', methods=['POST'])
def translate_text():
    try:
        # Get the text from the POST request
        data = request.get_json()
        text_to_translate = data['text']

        # Translate the text using EngtoHindi
        translator = EngtoHindi(text_to_translate)
        translation = translator.convert

        return jsonify({'translation': translation})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
