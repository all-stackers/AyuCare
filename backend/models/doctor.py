from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class Doctor(db.Document):
    name = db.StringField(required=True)
    age = db.IntField(required=True)
    gender = db.StringField(required=True)
    mobile_number = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)

    documents = db.ListField(db.DictField(), required=False)

    meta = {'collection': 'doctors'}

    @classmethod
    def add(cls, args):
        try:
            doctor = cls(**args)
            doctor.save()
            return {"error": False, "data": doctor}
        
        except (DuplicateKeyError, NotUniqueError):
            return {"error": True, "message": "User with same mobile already exists"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def get_by_mobile_number(cls, mobile_number):
        try:
            doctor = cls.objects.get(mobile_number=mobile_number)
            return {"error": False, "data": doctor}
        
        except cls.DoesNotExist:
            return {"error": True, "message": "User does not exist"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}

    @classmethod
    def add_documents(cls, mobile_number, documents):
        try:
            user = cls.objects.get(mobile_number=mobile_number)  
            user["documents"].append(documents)
            
            user.save()
            return {"error": False, "data": user}
        
        except cls.DoesNotExist:
            return {"error": True, "message": "User does not exist"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def get_documents(cls, mobile_number):
        try:
            user = cls.objects.get(mobile_number=mobile_number)
            return {"error": False, "data": user["documents"]}
        
        except cls.DoesNotExist:
            return {"error": True, "message": "User does not exist"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}