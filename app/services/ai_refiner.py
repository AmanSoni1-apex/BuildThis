import os
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import asyncio

class ProblemRefined(BaseModel):
    title: str = Field(description="A catchy, short title for the problem")
    description: str = Field(description="A refined, clear version of the user's messy problem")
    category: str = Field(description="The category of the problem (e.g. Transport, Food, Health)")

load_dotenv()
api_key=os.getenv("OPENROUTER_API_KEY")

# here we are making a llm object so that we can send the data to the llm for the further processing
llm=ChatOpenAI(
    model="nvidia/nemotron-3-super-120b-a12b:free",
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1",
    temperature=0.7
)


 # This is used to parse the output of the llm into a json format 
parser = JsonOutputParser(pydantic_object=ProblemRefined)

# Now we are creating a prompt template so that we can able to set the behaviour of the llm and also we can able to pass the input to the llm 
prompt_Template=ChatPromptTemplate.from_messages([
    ('system','You are an expert Solution Architect. Your task is to take a messy, unstructured problem description from a user and refine it into a clear, technical problem statement. Do not add any extra information or explaination in the output return only the valid JSON output {format_instructions} '),
    ('human',"{messy_input}")
])

prompt_Template = prompt_Template.partial(format_instructions=parser.get_format_instructions())

chain=prompt_Template | llm | parser # Now '|' this is the pipe operator in the langchain here we are Building a chain and then it is used to chain the components together , here each step is passed out to the next step 


async def refine_problem(messy_input:str):
    try:
        result= await chain.ainvoke({"messy_input":messy_input})
        return result
    except Exception as e:
        raise e
