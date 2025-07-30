# 📊 Sentiment Insight – Text Sentiment Analyzer with Visual Feedback

**Sentiment Insight** is a fullstack web app that analyzes user input (e.g., product reviews or statements) and predicts the **overall sentiment** as **positive or negative**, with **percentage-based visual feedback** using a pie chart.

Ideal for users who want to quickly evaluate the sentiment of feedback, customer reviews, or personal writing.

---

## Features

- ✍️ Input any sentence, paragraph, or review
- ⚡ Real-time sentiment analysis using NLP
- 📈 Pie chart visualizing positive/negative sentiment ratio
- 🔙 Backend powered by FastAPI
- 🌐 Frontend built with Next.js
- 🔗 Seamless fullstack integration (single repo)

---

## 🧠 Tech Stack

| Layer      | Tech              |
|------------|-------------------|
| Frontend   | Next.js, React, Chart.js |
| Backend    | FastAPI, TextBlob |
| NLP Tools  | TextBlob for polarity |
| Hosting    | Vercel (frontend), Render (backend) |

---

## Folder Structure

sentiment-analysis/
├── backend/ # FastAPI backend
│ ├── main.py
│ ├── sentiment.py
│ └── requirements.txt
├── frontend/ # Next.js frontend
│ ├── app/
│ └── ...
├── README.md
└── .gitignore


###  Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend (Next.js)
cd frontend
npm install
npm run dev


 Deployment
Frontend → Vercel
Backend → Render
