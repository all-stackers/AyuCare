from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User as UserModel
import os
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

storage_context = StorageContext.from_defaults(persist_dir="./AI/medical_composition_index")
medical_index = load_index_from_storage(storage_context)

memory = ChatMemoryBuffer.from_defaults(token_limit=3500)

balance_dosha_engine = medical_index.as_chat_engine(
    chat_mode="context",
    memory=memory,
    system_prompt="""
        You are an expert of Ayurveda who is telling the patient effects of the ayurvedic dosha (vata, pitta, kapha).
        I will provide you the percentage of vata, pitta, kapha and you should analyse my data and if found any threats then only provide me with potential health threats and available treatments to balance the dosha.
        Your response should be less than 300 characters.
    """ ,
)

class AyurvedicDoshas(Resource):
    @jwt_required()
    def post(self):
        mobile_number = get_jwt_identity()

        response = UserModel.get_user_by_mobile_number(mobile_number)
        if response["error"]:
            return response, 500
        
        user = response["data"]

        query = f"""
            vata: {int(user.vata) * 10}%,
            pitta: {int(user.pitta) * 10}%,
            kapha: {int(user.kapha) * 10}%,
        """

        response = balance_dosha_engine.chat(query)

        return {"error": False, "data": response.response}, 200
        