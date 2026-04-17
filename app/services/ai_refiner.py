import os
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import asyncio

load_dotenv()
api_key=os.getenv("OPENROUTER_API_KEY")

# here we are making a llm object so that we can send the data to the llm for the further processing
llm=ChatOpenAI(
    model="google/gemini-2.0-flash-001",
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1"
)

# Now we are creating a prompt template so that we can able to set the behaviour of the llm and also we can able to pass the input to the llm 
prompt_Template=ChatPromptTemplate.from_messages([
    ('system','You are an expert Solution Architect. Your task is to take a messy, unstructured problem description from a user and refine it into a clear, technical problem statement. Do not add any extra information or explaination in the output return only the valid JSON output '),
    
    ('human',"{messy_input}")
])

parser=JsonOutputParser() # This is used to parse the output of the llm into a json format 

chain=prompt_Template | llm | parser # Now '|' this is the pipe operator in the langchain here we are Building a chain and then it is used to chain the components together , here each step is passed out to the next step 


async def refine_problem(messy_input:str):
    try:
        result= await chain.ainvoke({"messy_input":messy_input})
        return result
    except Exception as e:
        print({"message :-": str(e)})
        return None

# async def test_refiner():
#     print("We are testing the ai refiner")
#     messy_test_input="mujhe ek e-commerce app banani hai jisme log purani kitabein bech sakein aur system automatically price suggest kare"
#     result=await refine_problem(messy_test_input)
#     if result:
#         print("Ai gave us the result")
#         print(result)
#     else:
#         print("Ai dont gave use the result")\
        
# if __name__=="__main__":
#     asyncio.run(test_refiner())