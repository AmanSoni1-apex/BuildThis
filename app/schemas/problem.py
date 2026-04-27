# Data Validation Layer this defines what data comes in/out of API this define's what user sends/recieve

from pydantic import BaseModel # Now this import is used to Validate and structure data coming in/out of API ,you can say this is "Used for API/data validation layer" .
from typing import Optional , Any # used this when a field is not required.

class ProblemBase(BaseModel):
    #  Now this is the "Base Schema" it defines the common fields that will be used in multiple schemas.
    description:str
    
class ProblemCreate(ProblemBase): # This is what you expect from the user when they create a new problem .
    pass

class Problem(ProblemBase):  # This is what you send back to the user or the response contain these fields 
    id:int
    title:str
    category:str
    architecture: Optional[Any] = None

    class Config:
        orm_mode=True
        # we have the ORM layer "SQLAlchemy" this layer is normally responsible for the db operation or it talk to the db and due to this we dont have to write the db queries manually and now due to this when we have to fetch the data out of the db we get the "sqlalchemy object" and now we have to convert this object into the "JSON" format why the pydantic expect a dict but he got a "sqlalchemy object" so he got confused and to solve this we have the above line that says "Hey, this is not a dict — read it like an object" :-
        # Without orm_mode "Error → cannot convert object" 
        # With orm_mode "Works → reads attributes → converts to JSON"
        # we dont have any problem while recieving the input form the use cuz its already comming in the JSON format . 