
# This is the primary entry point of the FastAPI application. It acts as the 
# central hub that orchestrates the entire data flow.

# DATA FLOW (The Lifecycle):
# 1. USER/CLIENT: Triggers an HTTP request (e.g., POST /problems/).
# 2. GATEWAY (main.py): Receives the raw request and directs it to the Router.
# 3. ROUTER (APIRouter): Acts as a guard, matches the Method/Path, and triggers 
#     the specific API Endpoint.
# 4. SERVICE LAYER: Logic processing starts here; calls the 'Brain' (AI Refiner).
# 5. AI REFINER (LLM): Processes messy user input into structured data.
# 6. DATABASE (DB): Stores the refined results and returns the saved object.
# 7. RESPONSE: The processed data flows back through the Service -> Router -> 
#    Gateway -> and finally back to the User as a JSON response.



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api_v1.endpoints import problems

app=FastAPI(
    title="BuildThis AI Architecture",
    description="Transforming messy ideas into technical blueprints.",
    version="1.0.0"
)

app.include_router(
    problems.router,
    prefix="/api/v1/problems",
    tags=["problems"]
)

@app.get("/")
async def root():
    return {"message":"BuildThis AI backend is live and secure"}

    