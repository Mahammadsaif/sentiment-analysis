import re
from textblob import TextBlob

# Clean tweet text
def clean_tweet(text: str) -> str:
    text = re.sub(r"http\S+", "", text)  # Remove URLs
    text = re.sub(r"@\w+", "", text)     # Remove mentions
    text = re.sub(r"#\w+", "", text)     # Remove hashtags
    text = re.sub(r"\n", " ", text)      # Remove line breaks
    text = re.sub(r"[^\w\s]", "", text)  # Remove punctuation
    return text.strip()

# Get sentiment
def get_sentiment(text: str) -> str:
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    else:
        return "Neutral"
