from transformers import pipeline

emotion_pipeline = pipeline(
    "text-classification",
    model="bhadresh-savani/bert-base-go-emotion",
    return_all_scores=True
)

def detect_emotions(text: str):
    results = emotion_pipeline(text)
    emotions = {
        label["label"]: label["score"]
        for label in results[0]
        if label["score"] > 0.1 # filter low confidence
    }
    return emotions
