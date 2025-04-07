# routes/analyze.py
from fastapi import APIRouter
from models.schema import AnalyzeRequest, EmotionResult
from nlp.emotion_detector import detect_emotions
from utils.db import save_emotion_record
from datetime import datetime

router = APIRouter()

@router.post("/analyze", response_model=EmotionResult)
def analyze(request: AnalyzeRequest):
    emotions = detect_emotions(request.text)
    timestamp = datetime.utcnow()

    if request.user_id:
        save_emotion_record(
            user_id=request.user_id,
            text=request.text,
            emotions=emotions,
            timestamp=timestamp
        )

    return {
        "emotions": emotions,
        "timestamp": timestamp.isoformat()
    }
