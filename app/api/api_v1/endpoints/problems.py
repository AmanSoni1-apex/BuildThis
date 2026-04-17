from fastapi import APIRouter, Depends, HTTPException
from SQLAlchemy.orm import Session
from app.schemas.problem import ProblemCreate , Problem
from app.services.ai_refiner import refine_problem
from app.models.problem import Problem as ProblemModel
from app.core.db import get_db

router=APIRouter()

@router.post("/", response_model=Problem)
# After using *, arguments cannot be passed based on position. We must explicitly specify which value belongs to which parameter using names like db=value and problem_in=value , it prevents bugs and improves clarity in bigger systems .
#  we are recieveing the messy description of the problem as the user_input from the user cuz this is the only thing the user going to send why not he added the title and the category..? cuz if he know the title and category of the problem then their is no point of "ai_refiner" cuz this is the core feature of our application in whihc it take the messy decription of the problem form the user and then send it to the llm for the further processing and then it return the refined response that contain diff-diff field like title , refined_description , category etc . related to that user problem..!
async def create_problem( *, db: Session = Depends(get_db),problem_in:ProblemCreate):
    refined_data= await refine_problem(problem_in.description)
    if not refined_data:
        raise HTTPException(status_code=500 , detail="AI service failed to refine the problem")

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