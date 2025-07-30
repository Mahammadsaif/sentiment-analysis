"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to fetch sentiment data.");
    }
  };

  const chartData = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        label: "Sentiment Score",
        data: result ? [result.scores.positive, result.scores.negative] : [0, 0],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderWidth: 1
      }
    ]
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black-100">
      <div className="w-full max-w-xl bg-black rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Sentiment Analyzer</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="border p-3 rounded-md resize-none h-32"
            placeholder="Paste a product review or opinion..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Analyze Sentiment
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Overall Sentiment:{" "}
              <span
                className={`${
                  result.label === "Positive"
                    ? "text-green-600"
                    : result.label === "Negative"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {result.label}
              </span>
            </h2>
            <p className="mb-4">
              Positive: {result.scores.positive}% | Negative:{" "}
              {result.scores.negative}%
            </p>

            <div className="w-64 mx-auto">
              <Pie data={chartData} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
