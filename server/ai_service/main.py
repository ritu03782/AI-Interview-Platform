from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openrouter_service import OpenRouterService

from openai import APIStatusError, RateLimitError
    
app = FastAPI()

ai = OpenRouterService()

class ResumeRequest(BaseModel):
    messages: list
@app.post("/analyze-resume")
def analyze_resume(request: ResumeRequest):
    try:
        result = ai.ask_ai(request.messages)
        return {"success": True, "data": result}

    except RateLimitError as error:
        print("Rate limit:", error.response.text)
        raise HTTPException(
            status_code=429,
            detail="OpenRouter rate limit or provider capacity issue"
        )

    except APIStatusError as error:
        print("OpenRouter API error:", error.status_code, error.response.text)
        raise HTTPException(
            status_code=error.status_code,
            detail="OpenRouter API request failed"
        )

    except Exception as error:
        print("Unexpected error:", repr(error))
        raise HTTPException(status_code=500, detail="Resume analysis failed")
   
# app = FastAPI()

# ai = OpenRouterService()

# class ResumeRequest(BaseModel):
#     messages: list

# @app.post("/analyze-resume")
# def analyze_resume(request: ResumeRequest):
#     try:
#         result = ai.ask_ai(request.messages)

#         return {
#             "success": True,
#             "data": result
#         }

#     except Exception as error:
#         raise HTTPException(status_code=500, detail=str(error))