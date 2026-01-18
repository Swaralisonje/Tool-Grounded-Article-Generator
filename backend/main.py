from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse # Add this import
from services.llm_service import generate_grounded_content
from auth import verify_token, create_access_token
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import time

# Simple in-memory rate limiter
last_request_time = 0

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows localhost:3000 to talk to localhost:8000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContentRequest(BaseModel):
    query: str
    url_context: Optional[str] = None

@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # NO VALIDATION: Any username and password will work [cite: 12, 17]
    # We simply use the provided username to create the identity in the token
    access_token = create_access_token(data={"sub": form_data.username})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.post("/generate")
async def generate(request: ContentRequest, username: str = Depends(verify_token)):
    try:
        # Backend verifies authentication token before calling LLM [cite: 23, 24]
        data = generate_grounded_content(request.query, request.url_context)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.middleware("http")
async def rate_limit_middleware(request, call_next):
    global last_request_time
    if request.url.path == "/generate" and request.method == "POST":
        current_time = time.time()
        # Check if 15 seconds have passed since the last successful call
        if current_time - last_request_time < 15:
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many requests. Please wait 15 seconds between generations."}
            )
        last_request_time = current_time

    response = await call_next(request)
    return response