import json
import os
from flask_restful import Resource, reqparse
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from llama_index.embeddings.langchain import LangchainEmbedding
from llama_index.core import Settings
from llama_index.core.memory import ChatMemoryBuffer
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from llama_index.core import (
    StorageContext, 
    load_index_from_storage, 
)

os.environ["TOKENIZERS_PARALLELISM"] = "False"
os.environ["OPENAI_API_KEY"] = os.getenv("FLASK_OPENAI_API_KEY")
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI")

model = LangchainEmbedding(HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2'))
llm = ChatGoogleGenerativeAI(model="gemini-pro", convert_system_message_to_human=True)

Settings.embed_model = model
Settings.llm = llm

storage_context = StorageContext.from_defaults(persist_dir="./AI/medical_index")
medical_index = load_index_from_storage(storage_context)

memory = ChatMemoryBuffer.from_defaults(token_limit=3500)

predictDiseaseChatEngine = medical_index.as_chat_engine(
    chat_mode="context",
    memory=memory,
    system_prompt="""I will tell you the symptoms I am having. You should analyse them and tell me what disease I may be having and The ayurvedic treatment for that disease. 
    Your response should be less than 300 characters.
    Format the symptoms as follows. Output should be strictly in json format and should strictly contain nothing extra before and after that:
    {"DiseaseName": "XYZ",
    "Treatment": [
        {
            "treatmentName": "XYZ",
            "treatment": "XYZ"
        }
    ]}
    Symptoms are:""" ,
)

class PredictDisease(Resource):
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("symptoms", type=str, required=True, help="symptoms is required")
        args = parser.parse_args()
        symptoms = args["symptoms"]

        try:
            response = predictDiseaseChatEngine.chat(symptoms)
            print(response)
            json_response = json.loads(response.response)
            print(json_response)
            json_response["symptoms"] = symptoms
            return {"error": False, "data": json_response}, 200
        except Exception as e:
            return {"error": True, "message": str(e)}, 500
    