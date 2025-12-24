# React + Vite



## 🔗 Frontend (Voice UI)

A compact React + Vite app lives in `frontend/voice`. It provides a microphone-based emotion analyzer and a simple dashboard. Set your backend URL in `.env` using `VITE_API_URL`  then run:

```bash
cd frontend/voice
npm install
npm run dev
```

The dashboard fetches `GET ${VITE_API_URL}/history/{username}` to show analytics and recent conversations.
