# voice_emotion_app
 

---

```markdown
# 🧠 Voice-Based Mental Health Tracker - Backend

This is the backend API for a **voice-based mental health tracker** that analyzes user input using real NLP models to detect emotional states and stores them securely in a database (Supabase).

---

## 📌 What This Project Does

- Accepts **text input** (e.g., converted from speech)
- Uses a **fine-tuned BERT model** to detect emotions
- Returns a dictionary of emotions with probabilities
- Saves the result in **Supabase** with timestamp and user ID

---

## 🧠 Why Use Transformers (BERT)?

We use the model `bhadresh-savani/bert-base-go-emotion` from Hugging Face:

- Based on Google's **GoEmotions** dataset with 28 human emotions
- It allows **multi-label classification**, meaning one text can reflect multiple emotions
- Built on top of **BERT (Bidirectional Encoder Representations from Transformers)**, which deeply understands context

Example:
```
Input: "I'm tired and hopeless."
Output: {"sadness": 0.85, "frustration": 0.6}
```

---

## 🗂 Project Structure

```
backend/
├── main.py                   # Starts FastAPI and includes all routes
├── routes/
│   └── analyze.py            # Defines POST endpoint to analyze emotions
├── nlp/
│   └── emotion_detector.py   # Loads Hugging Face model and does prediction
├── models/
│   └── schemas.py            # Pydantic request and response schemas
├── utils/
│   └── db.py                 # Sends emotion data to Supabase
├── .env                      # Environment variables (not tracked by Git)
├── .gitignore                # Ignores .env, __pycache__, etc.
└── requirements.txt          # Python package list
```

---

## 🔍 File-by-File Breakdown

### `main.py`
Initializes and runs FastAPI app. Imports and attaches routes.

### `routes/analyze.py`
Defines the `/analyze` route:
- Accepts JSON input with `text` and optional `user_id`
- Calls the BERT model to get emotions
- If `user_id` is provided, saves results to Supabase

#### 🧾 History Route — `GET /history/{username}` 🔁
- Purpose: Return analytics and recent conversations for a given `username` (user_id).
- Behavior:
  - Queries the Supabase `emotion` table for `user_id = {username}` ordered by `created_at.desc`.
  - Computes: total analyses, top emotion (most frequent top emotion), number of sessions in the last 7 days, average emotion distribution, and returns up to 10 most recent conversations with their top emotion and percentage score.

Response shape (example):

```json
{
  "analytics": {
    "total_analyses": 12,
    "top_emotion": "sadness",
    "recent_sessions": 3
  },
  "average_emotions": {
    "joy": 0.120,
    "sadness": 0.420
  },
  "recent_conversations": [
    {
      "text": "I feel tired",
      "top_emotion": "sadness",
      "percentage": 46.2,
      "timestamp": "2025-12-20T12:34:56Z"
    }
  ]
}
```

Notes & requirements:
- Environment variables: `SUPABASE_URL` and `SUPABASE_KEY` must be set (service role key recommended for server-side queries).
- Supabase table columns expected: `user_id` (text), `text` (text), `emotions` (jsonb), `created_at` (timestamp with timezone).
- Errors: The route returns 500 when Supabase returns an error or on unexpected exceptions; the response includes an error detail.
- Usage: This endpoint is intended for the frontend dashboard to display analytics and recent sessions for a signed-in user.

Tip: When testing locally with the frontend, ensure CORS is enabled for your FastAPI app and the `VITE_API_URL` in the frontend points to your backend (see frontend section below).

### `nlp/emotion_detector.py`
Loads BERT model from Hugging Face and runs inference:
- Tokenizes input
- Runs through model
- Maps logits to emotion probabilities

### `models/schemas.py`
Pydantic models used by FastAPI to:
- Validate incoming requests (`AnalyzeRequest`)
- Format outgoing responses (`EmotionResult`)

### `utils/db.py`
Sends JSON emotion data to Supabase via REST API:
- Authenticates with service key
- Posts to `emotions` table
- Handles errors and logs output

---

## ✅ Supabase Table Schema

Your Supabase table `emotions` should have:

| Column      | Type     |
|-------------|----------|
| id          | UUID (auto) |
| user_id     | TEXT     |
| text        | TEXT     |
| emotions    | JSONB    |
| created_at  | TIMESTAMP (default now()) |

---

## 🔐 Environment Variables (.env)

Create a `.env` file like this:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-role-key
```

Never share this file. Keep it in `.gitignore`.

---

## ⚙️ How to Run

```bash
# Clone the repo
git clone https://github.com/your-username/backend.git
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run the FastAPI app
uvicorn main:app --reload
```

Visit: `http://127.0.0.1:8000/docs` to test the API with Swagger UI.

---

## 📦 requirements.txt

```
fastapi
uvicorn
transformers
torch
requests
python-dotenv
```

---

## 🙈 .gitignore

```
# Byte-compiled files
__pycache__/
*.py[cod]

# Virtual environments
venv/

# Environment variables
.env

# IDE config
.vscode/
```

---

## 🧪 Sample Request

```json
POST /analyze
{
  "text": "I'm stressed and can't sleep.",
  "user_id": "user_123"
}
```

Response:
```json
{
  "emotions": {
    "anxiety": 0.74,
    "sadness": 0.61
  },
  "timestamp": "2025-04-07T14:23:59Z"
}
```

---

## 📌 Notes

- This backend is **fully modular** and production-ready
- Can be paired with a **React frontend** (UI under development)
- All emotion analysis is done using a **real transformer model**
- **Supabase** is used for easy, scalable, and secure storage

---

## 💙 Built With

- Python + FastAPI
- Hugging Face Transformers (BERT)
- Supabase (PostgreSQL)
- REST API
- Clean, maintainable architecture

---

## 🧠 About the Emotion Model

Model: [`bhadresh-savani/bert-base-go-emotion`](https://huggingface.co/bhadresh-savani/bert-base-go-emotion)  
Paper: [GoEmotions (Google)](https://arxiv.org/abs/2005.00547)

---

> For frontend UI, see upcoming repo: `frontend`

```

---



