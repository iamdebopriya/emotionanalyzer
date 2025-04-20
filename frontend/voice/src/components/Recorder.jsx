import React, { useState } from "react";
import axios from "axios";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [emotions, setEmotions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setRecording(true);
      setErrorMsg("");
      setEmotions(null);
      setTranscript("");
    };

    recognition.onresult = async (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setRecording(false);
      setLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/analyze`,
          {
            text: result,
            user_id: "frontend_test_user",
          },
          {
            timeout: 5000,
          }
        );
        setEmotions(response.data.emotions);
      } catch (err) {
        if (err.code === "ECONNABORTED") {
          setErrorMsg("Request timed out. Is your backend running?");
        } else if (err.response) {
          setErrorMsg(`Server Error: ${err.response.status}`);
        } else {
          setErrorMsg("Could not connect to the backend.");
        }
      } finally {
        setLoading(false);
      }
    };

    recognition.onerror = () => {
      setRecording(false);
      setErrorMsg("Voice recognition failed.");
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col items-center p-6">
      <button
        onClick={startRecording}
        disabled={recording}
        className={`px-6 py-3 rounded-xl font-semibold shadow-lg ${
          recording
            ? "bg-red-500 animate-pulse"
            : "bg-purple-500 hover:bg-pink-300"
        } text-black transition duration-200`}
      >
        {recording ? "Recording..." : "Start Talking"}
      </button>

      {errorMsg && (
        <p className="mt-4 text-red-500 bg-red-100 p-2 rounded-xl text-center">
          {errorMsg}
        </p>
      )}

      {transcript && (
        <p className="mt-4 text-center text-black/80 italic">
          Transcript: "{transcript}"
        </p>
      )}

      {loading && <p className="mt-4 text-yellow-300">Analyzing emotions...</p>}

      {emotions && (
        <div className="mt-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl w-full max-w-md shadow-md">
          <h3 className="text-lg font-bold mb-4 text-black">Detected Emotions</h3>
          <ul className="text-black/90 space-y-2">
            {Object.entries(emotions).map(([emotion, score]) => (
              <li key={emotion} className="flex justify-between">
                <span>{emotion}</span>
                <span className="font-mono">{(score * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recorder;
