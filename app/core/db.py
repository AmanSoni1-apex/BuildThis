import os
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base  # here we are Converting Python class → Database table that's why this import is here 
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine=create_engine(DATABASE_URL) # how to connect , where to connect and how to manager the connection , its the one that connect you app to the database

SessionLocal=sessionmaker(autocommit=False , autoflush=False , bind=engine)
# This is the factory to create the session's(temporary converstaion with the database so perform the actions like inser the data , read it , update it , delete it , if its open then you can perfom the data operation , and if its close you can't , if its open then you have to close it to prevent the data loss {
# autocommit :- if its false you have to manually commit the changes to db .
# autoflush :- mean send the data to the db but don't save it permanently and when this is false you have to manully flush the data to the db .
# bind :- Bind mean connect this session to a specific db engine and if its None then you have to manually bind the session to a db engine , here it simply says whenever you create a session it should be bind to the engine we created above . 
# }

Base=declarative_base() # This creates a base class that tells SQLAlchemy Any class inheriting from base will be treat as a DB table. "problem.py" imports Base from db.py so it can register its class as a database model.

def get_db():
    db=SessionLocal()  # create the newly local session for this request
    try:
        yield db  # give this session to the api endpoint so it can use it to perform the db operation
    finally:
        db.close()  # come back here to close it 