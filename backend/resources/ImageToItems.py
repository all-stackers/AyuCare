from flask import request
from flask_restful import Resource, reqparse
import google.generativeai as genai
from pathlib import Path
import json
from io import BytesIO


genai.configure(api_key = 'AIzaSyCZ3hM3g0uvHPhgvzjpK1xBJ1_gk6I8sY0')

generation_config = {
  "temperature": 0.4,
  "top_p": 1,
  "top_k": 32,
  "max_output_tokens": 4096,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  }
]

model = genai.GenerativeModel(model_name = "gemini-pro-vision",
    generation_config = generation_config,
    safety_settings = safety_settings
)

def input_image_setup(image):
    image_parts = [
        {
            "mime_type": "image/png",
            "data": image.getvalue()
        }
    ]
    return image_parts

def generate_gemini_response(input_prompt, image, question_prompt):

    image_prompt = input_image_setup(image)
    prompt_parts = [input_prompt, image_prompt[0], question_prompt]
    response = model.generate_content(prompt_parts)
    return response.text

input_prompt = """
               You are an Nutirtional expert who understands calories in food.
               You will receive input images of food items and you have to predict the calories in the food item.
"""

question_prompt = """You will receive a photo of food items. List down 5-10 food items with thier calories and calories from the photo given to you. It should be strictly a descrete number and not range. Strictly no other words, introduction and outro are allowed. Response should be an array of food items.
    for example: 
        [
            {"foodName": "apple", "calories": 200}, 
            {"foodName":"banana","calories": 400}
        ]
    Strictly no \n or \ or any other special characters are allowed. don't format your response in any way.
"""

class ImageToItems(Resource):
    def post(self):
        image = request.files['image']

        image_content = BytesIO(image.read())
        response = generate_gemini_response(input_prompt, image_content, question_prompt)
        parsed_array = json.loads(response)

        return {"error": False, "data": parsed_array}, 200
        