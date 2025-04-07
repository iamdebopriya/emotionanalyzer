# models/schemas.py
from pydantic import BaseModel
from typing import List, Dict, Optional

class AnalyzeRequest(BaseModel):
    text: str
    user_id: Optional[str] = None  # Add this if you want to track users

class EmotionResult(BaseModel):
    emotions: Dict[str, float]
    timestamp: str
