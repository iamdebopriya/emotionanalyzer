# utils/db.py
import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def save_emotion_record(user_id, text, emotions, timestamp):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    # Ensure Supabase table has a 'jsonb' column for emotions
    data = {
        "user_id": user_id,
        "text": text,
        "emotions": emotions,  # send as dict (for jsonb column)
        "created_at": timestamp.isoformat()
    }

    try:
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/emotion",
            headers=headers,
            json=data,
        )

        if response.status_code != 201:
            print("❌ Supabase Error:", response.status_code, response.text)
        else:
            print("✅ Emotion saved:", response.json())
    except Exception as e:
        print("❌ Exception during Supabase save:", e)
