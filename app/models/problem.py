# this is the "Database Layer" this defines how data is stored in DB this is all about “How data looks inside the database”


from sqlalchemy import Column, Integer , String , Text , ForeignKey , JSON
from app.core.db import Base 

class Problem(Base): # Here we are creating a class and it is inherit form Base class and now this class will be treated as a table in the database.
    __tablename__="problems"
    id=Column(Integer, primary_key=True , index=True )
    title=Column(String , index=True) # Here we are creating a column and it is indexed which means we can do the index based searching which is faster than the normal searching , string=short text

    description=Column(Text) # Text=Long text 
    category=Column(String)
    
    author_id=Column(Integer , nullable=True)
    architecture = Column(JSON , nullable=True)