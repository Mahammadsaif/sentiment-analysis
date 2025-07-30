from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textblob import TextBlob

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model
class TextInput(BaseModel):
    text: str

# Sentiment calculation
@app.post("/analyze")
def analyze_sentiment(input: TextInput):
    text = input.text.strip()
    if not text:
        return {"error": "Empty input"}

    blob = TextBlob(text)
    polarity = blob.sentiment.polarity  # Range: -1 to 1

    if polarity > 0:
        label = "Positive"
        pos_score = round(polarity * 100, 2)
        neg_score = 100 - pos_score
    elif polarity < 0:
        label = "Negative"
        neg_score = round(abs(polarity) * 100, 2)
        pos_score = 100 - neg_score
    else:
        label = "Neutral"
        pos_score = neg_score = 50

    return {
        "text": text,
        "label": label,
        "scores": {
            "positive": pos_score,
            "negative": neg_score
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
