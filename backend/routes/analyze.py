
    
from fastapi import APIRouter, HTTPException
from models.schema import AnalyzeRequest, EmotionResult
from nlp.emotion_detector import detect_emotions
from utils.db import save_emotion_record
from datetime import datetime, timedelta, timezone
from collections import Counter, defaultdict
import os
import requests

router = APIRouter()

# ---------------- ENV ----------------
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Supabase credentials missing")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
}

# ---------------- ANALYZE ----------------
@router.post("/analyze", response_model=EmotionResult)
def analyze(request: AnalyzeRequest):
    emotions = detect_emotions(request.text)
    timestamp = datetime.now(timezone.utc)

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

# ---------------- HISTORY ----------------
@router.get("/history/{username}")
def get_history(username: str):
    try:
        res = requests.get(
            f"{SUPABASE_URL}/rest/v1/emotion",
            headers=HEADERS,
            params={
                "user_id": f"eq.{username}",
                "order": "created_at.desc",
            }
        )

        if res.status_code != 200:
            raise HTTPException(status_code=500, detail=res.text)

        records = res.json()

        if not records:
            return {
                "analytics": {
                    "total_analyses": 0,
                    "top_emotion": None,
                    "recent_sessions": 0
                },
                "average_emotions": {},
                "recent_conversations": []
            }

        # ---- Analytics ----
        total_analyses = len(records)
        last_7_days = datetime.now(timezone.utc) - timedelta(days=7)

        recent_sessions = 0
        emotion_counter = Counter()
        emotion_totals = defaultdict(float)

        for r in records:
            created_at = datetime.fromisoformat(
                r["created_at"].replace("Z", "+00:00")
            )

            if created_at > last_7_days:
                recent_sessions += 1

            for emotion, score in r.get("emotions", {}).items():
                emotion_counter[emotion] += 1
                emotion_totals[emotion] += score

        top_emotion = (
            emotion_counter.most_common(1)[0][0]
            if emotion_counter else None
        )

        # ---- Average Emotion Distribution ----
        avg_emotions = {
            e: round(v / total_analyses, 3)
            for e, v in emotion_totals.items()
        }

        # ---- Recent Conversations (last 10) ----
        recent_conversations = []
        for r in records[:10]:
            emotions = r.get("emotions", {})
            if emotions:
                top_e, top_score = max(emotions.items(), key=lambda x: x[1])
            else:
                top_e, top_score = "neutral", 0.0

            recent_conversations.append({
                "text": r["text"],
                "top_emotion": top_e,
                "percentage": round(top_score * 100, 1),
                "timestamp": r["created_at"]
            })

        return {
            "analytics": {
                "total_analyses": total_analyses,
                "top_emotion": top_emotion,
                "recent_sessions": recent_sessions
            },
            "average_emotions": avg_emotions,
            "recent_conversations": recent_conversations
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
