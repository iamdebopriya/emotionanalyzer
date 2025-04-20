import React from "react";
import Recorder from "../components/Recorder";

const Home = () => {
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border border-white/20">
      <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
        Voice Mood Analyzer 🎤
      </h1>
      <Recorder />
    </div>
  );
};

export default Home;
