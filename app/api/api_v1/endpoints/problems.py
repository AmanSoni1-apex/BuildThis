from traitlets.utils import descriptions
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.problem import ProblemCreate , Problem
from app.services.ai_refiner import refine_problem
from app.models.problem import Problem as ProblemModel #imported as the ProblemModel so to avoide the namespace collision.
from app.core.db import get_db
from typing import List
from app.services.ai_architect import generate_architecture

router=APIRouter()

@router.post("/", response_model=Problem) # route -> The object that connects the url to the function
# After using *, arguments cannot be passed based on position. We must explicitly specify which value belongs to which parameter using names like db=value and problem_in=value , it prevents bugs and improves clarity in bigger systems .
#  we are recieveing the messy description of the problem as the user_input from the user cuz this is the only thing the user going to send why not he added the title and the category..? cuz if he know the title and category of the problem then their is no point of "ai_refiner" cuz this is the core feature of our application in which it take the messy decription of the problem form the user and then send it to the llm for the further processing and then it return the refined response that contain diff-diff field like title , refined_description , category etc . related to that user problem..!
async def create_problem( *, db: Session = Depends(get_db),problem_in:ProblemCreate): # endpoint -> The function that is called when the user visits the 
    try:
        refined_data = await refine_problem(problem_in.description)
        
        # Check if AI actually gave us something
        if not refined_data or not refined_data.get("title") or not refined_data.get("description"):
            raise HTTPException(status_code=500, detail="AI Refiner failed to structure your problem.")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong with AI services {e}")


    # here we are creating the object of the ProblemModel and passing the refined data to it 
    db_obj=ProblemModel(
        # when we send the messy_user_input to the ai_refiner it return the processed data and in that data we also have the title and category which was not in the input but it is present in the output which is given by the ai_refiner , and that how we have the field of title and the category here . 
        title=refined_data.get("title"),
        description=refined_data.get("description"),
        category=refined_data.get("category","General")
    )
    
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.post("/{problem_id}/architecture" , response_model=Problem)
async def generate_problem_architecture(problem_id:int , db:Session=Depends(get_db)):
    db_problem = db.query(ProblemModel).filter(ProblemModel.id==problem_id).first()
    if not db_problem:
        raise HTTPException(status_code=404 , detail="Problem not found")

    architecture_data=await generate_architecture(title=db_problem.title , description=db_problem.description)
    db_problem.architecture=architecture_data
    db.commit()
    db.refresh(db_problem)
    
    return db_problem

@router.get("/{problem_id}",response_model=Problem)
async def get_problem(problem_id:int , db:Session=Depends(get_db)):
   db_problem=db.query(ProblemModel).filter(ProblemModel.id==problem_id).first()
   if not db_problem:
       raise HTTPException(status_code=404, detail="Problem not found")

   return db_problem

@router.get("/",response_model=List[Problem]) 
async def get_all_problems(db:Session=Depends(get_db)):
    db_problem=db.query(ProblemModel).all()
    
    if not db_problem:
        raise HTTPException(status_code=404 , detail="No problems found")
    return db_problem

    