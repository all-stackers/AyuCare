from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from flask_restful import Resource, reqparse
import os
import json

os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI")

llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

result = llm.invoke("What is a LLM?")

question_prompt = f"""I will provide you an list of food items and you have to predict the calories in the food item.
    your response should be in the format:
    [
        {{"foodName": "XYZ",
        "calories": "XYZ"}},
        {{"foodName": "XYZ",
        "calories": "XYZ"}}
    ]
    input is: {input}
"""

class Calories(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("items", type=list, location="json", help="items is required")
        args = parser.parse_args()

        response = llm.invoke(f"""I will provide you an list of food items and you have to predict the calories in the food item.
            your response should be in the format:
            [
                {{"foodName": "XYZ",
                "calories": "XYZ"}},
                {{"foodName": "XYZ",
                "calories": "XYZ"}}
            ]
            input is: {args["items"]}
            Strictly no other words, introduction and outro are allowed.Strictly provide a single number for calories dont give range
        """)
        print(response.content)

        response = json.loads(response.content)

        return {"error": False, "data": response}, 200




        