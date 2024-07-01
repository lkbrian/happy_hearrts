import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_jwt_extended import JWTManager
load_dotenv()

app=Flask(__name__)

app.secret_key=os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI']=os.environ.get("DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.json.compact=False

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db=SQLAlchemy(metadata=metadata)
db.init_app(app)

jwt=JWTManager()
jwt.init_app(app)

api=Api(app)
migrate=Migrate(app,db)
CORS(app)

# constants.py

valid_roles = [
    "admin",
    "reception_desk",
    "accounts_desk",
]
