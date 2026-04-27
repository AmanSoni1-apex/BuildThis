
from fastapi import HTTPException
from pydantic import Field
import os
from pydantic import BaseModel
from typing import List
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()
api_key=os.getenv("OPENROUTER_API_KEY")

class Technical_Architecture(BaseModel):
    front_end:str=Field(description="The tech stack we are going to use for the frontend and also specify why we are only using this tech in the frontend and why not other ")

    backend:str=Field(description="The tech stack we are going to use for the backend and also specify why we are only using this tech in the backend and why not other ")

    database:str=Field(description="The Database we are going to use in the production and also specify why we are only using this tech in the database and why not other database")

    deployment_platform:str=Field(description="Which deployment platform we are going to use to deploy our application and also specify why we are only using this deployment platform and not other ")

    api_endpoints_List:List[str]=Field(description="The list of api endpoint's our project is going to use/have ")

    database_relationship:str=Field(description="The relationship between the database table's and also specify why we are only using this db relationship's and not other ")

    key_feature:List[str]=Field(description="The list of key feature's our project is going to have")
    
    difficuly_level:str=Field(description="How difficult is to make this application and why it is so difficult also specify what are those points on which we are going to face the difficuties during the making of the project ")

    mvp_duration:str=Field(description="How much time it will take to build the MVP of the application and what are the feature and the component we should focus on to build the MVP and also specify how to complete the mvp in the estimated time")

    project_completion_time:str=Field(description="How much time it will take to build the complete project and from which point we should start building the mvp what component to build first whether its the frontend , backend.. and so on and also specify how to complete the mvp in the estimated time")

    technology_justification:str=Field(description="Here in this field, explain WHY you chose each specific technology over others")


class Architecture_plan(BaseModel):
    app_name:str=Field(description="The name of the application it should be short and relatable to the problem , if it is related to food then the name app name should be related to food and if it is related to the health then the app name should be related to the health and so on..!")

    app_architecture:Technical_Architecture=Field(description="The architecture of the application")
    
    # cost_estimate
    reasoning_for_tech_stack_and_features:str=Field(description="The reasoning behind the choice of the tech stack and the features ")

    data_flow_in_project:str=Field(description="How the data should flow in the enitre project it should be in a way that the data should flow from the frontend to the database and then from the database to the frontend or from the frontend to the backend and then to the database and then to the frontend or from the frontend to the backend and then to the database and then to the frontend and so on ")


llm=ChatOpenAI(
    model="google/gemini-2.0-flash-001",
    base_url="https://openrouter.ai/api/v1",
    temperature=0.9,
    api_key=api_key
)

parser=JsonOutputParser(pydantic_object=Architecture_plan)

prompt_template=ChatPromptTemplate.from_messages([
    ('system','''You are a World-Class Solution Architect with experience in Y-Combinator startups and Fortune 500 companies. Your task is to generate a highly specific, professional technical blueprint for a given problem CRITICAL RULES:

    1. DOMAIN SPECIFICITY: Analyze the problem domain. If it's Hardware, use C++/Rust/Embedded systems. If it's Data Science, focus on Python/R/Julia. If it's High-Performance Backend, consider Go/Rust/Java.
    2. AVOID COOKIE-CUTTER SOLUTIONS: Do not default to 'FastAPI/Next.js' unless it is truly the best fit. 
    3. TECHNOLOGY JUSTIFICATION: In the 'reasoning' field, explain WHY you chose each specific technology over others.
    4. CLOUD STRATEGY: Select a deployment platform that fits the project scale (e.g., Vercel/Railway for MVPs, AWS/GCP/Azure for Enterprise/Complex systems).
    5. TIMELINES: Be realistic. A complex AI system takes longer than a simple CRUD app.
    6. JSON ONLY: Return only valid JSON output.   

    {format_instructions} 
    '''
    ),

    ('human','Design an architecture for the following project:\n Project Title: {title} \n Project Description: {description} ')
])

prompt_template=prompt_template.partial(format_instructions=parser.get_format_instructions())

chain=prompt_template | llm | parser


async def generate_architecture(title:str , description:str):
    try:
        result = await chain.ainvoke({
            "title":title ,
            "description":description
        })
        return result
    except Exception as e:
        raise HTTPException(status_code=500 ,detail="AI Architecture services is currently down..!") 