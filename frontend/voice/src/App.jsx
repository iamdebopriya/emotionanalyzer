import React, { useState, useEffect } from "react";
import { Mic, Waves, Sparkles, AlertCircle, Brain, Zap, ArrowRight, LogOut, BarChart3, Home, Activity, TrendingUp, Calendar } from "lucide-react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("hero");
  const [username, setUsername] = useState("");
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("emotionai_username");
    if (storedName) {
      setUsername(storedName);
      setCurrentPage("dashboard");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      localStorage.setItem("emotionai_username", inputName.trim());
      setUsername(inputName.trim());
      setCurrentPage("dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("emotionai_username");
    setUsername("");
    setCurrentPage("hero");
  };

  if (currentPage === "hero") {
    return <HeroPage onGetStarted={() => setCurrentPage("login")} />;
  }

  if (currentPage === "login") {
    return <LoginPage inputName={inputName} setInputName={setInputName} onLogin={handleLogin} />;
  }

  if (currentPage === "dashboard") {
    return <DashboardPage username={username} onLogout={handleLogout} onNavigate={setCurrentPage} />;
  }

  if (currentPage === "analyzer") {
    return <AnalyzerPage username={username} onLogout={handleLogout} onNavigate={setCurrentPage} />;
  }

  return null;
};

const HeroPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-purple-600 to-fuchsia-600 p-6 rounded-full">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent leading-tight">
          Voice Emotion AI
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-200 mb-4 max-w-2xl mx-auto">
          Decode the hidden emotions in your voice with advanced AI technology
        </p>

        <p className="text-purple-300/60 mb-12 max-w-xl mx-auto">
          Speak naturally and our neural network will analyze your emotional state in real-time
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
            <Mic className="w-10 h-10 text-purple-400 mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Voice Recognition</h3>
            <p className="text-purple-200/60 text-sm">Advanced speech-to-text</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-fuchsia-400/50 transition-all duration-300 hover:scale-105">
            <Zap className="w-10 h-10 text-fuchsia-400 mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Real-Time Analysis</h3>
            <p className="text-purple-200/60 text-sm">Instant emotion detection</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
            <BarChart3 className="w-10 h-10 text-pink-400 mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-purple-200/60 text-sm">Track your emotional patterns</p>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          className="group relative inline-flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 rounded-full flex items-center gap-3 group-hover:scale-105 transition-transform text-white font-semibold text-lg">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};

const LoginPage = ({ inputName, setInputName, onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 p-4 rounded-full">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
            Welcome
          </h2>
          <p className="text-center text-purple-200/60 mb-8">Enter your name to continue</p>

          <div className="space-y-6">
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && inputName.trim() && onLogin(e)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                autoFocus
              />
            </div>

            <button
              onClick={onLogin}
              disabled={!inputName.trim()}
              className="w-full group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                Continue
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = ({ username, onLogout, onNavigate }) => {
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased to 10 seconds

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/history/${username}`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if we have valid data
      if (!data || !data.recent_conversations) {
        // No error, just no data yet
        setHistory([]);
        setAnalytics(null);
        setLoading(false);
        return;
      }
      
      // Backend returns analytics, average_emotions, and recent_conversations
      setHistory(data.recent_conversations || []);
      
      // Process the data from backend
      const sortedEmotions = Object.entries(data.average_emotions || {}).sort(([,a], [,b]) => b - a);
      const topEmotion = sortedEmotions[0];
      
      setAnalytics({
        totalAnalyses: data.analytics?.total_analyses || 0,
        averageEmotions: sortedEmotions,
        topEmotion: [data.analytics?.top_emotion || (topEmotion ? topEmotion[0] : 'neutral'), topEmotion ? topEmotion[1] : 0],
        recentCount: data.analytics?.recent_sessions || 0
      });
    } catch (err) {
      // Only show error for actual connection issues
      if (err.name === 'AbortError') {
        setError("Request timed out. Please check your backend connection.");
      } else if (err.message.includes('Failed to fetch')) {
        setError("Cannot connect to backend. Make sure it's running on the correct port.");
      } else if (!err.message.includes('404')) {
        // Don't show 404 as critical error - might just be empty data
        setError("Could not load conversation history");
      }
      setHistory([]);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: "from-yellow-400 to-orange-500",
      sadness: "from-blue-400 to-indigo-600",
      anger: "from-red-500 to-rose-700",
      fear: "from-purple-500 to-violet-700",
      surprise: "from-pink-400 to-fuchsia-600",
      disgust: "from-green-500 to-emerald-700",
      neutral: "from-gray-400 to-slate-600",
    };
    return colors[emotion?.toLowerCase()] || "from-cyan-400 to-blue-600";
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-purple-200/60 text-sm">Welcome, {username}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('analyzer')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-lg text-white text-sm transition-all"
              >
                <Mic className="w-4 h-4" />
                New Analysis
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-purple-200 text-sm transition-all border border-white/10"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex gap-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-200 font-medium mb-2">{error}</p>
              <p className="text-yellow-200/60 text-sm mb-4">The backend API might not be responding properly.</p>
              <button
                onClick={fetchHistory}
                className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-200 text-sm transition-all border border-yellow-500/30"
              >
                Retry Connection
              </button>
            </div>
          </div>
        ) : !analytics ? (
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-12 text-center">
            <Activity className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">No Data Yet</h3>
            <p className="text-purple-200/60 mb-6">Start analyzing your voice to see insights</p>
            <button
              onClick={() => onNavigate('analyzer')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg text-white font-medium hover:scale-105 transition-transform"
            >
              <Mic className="w-5 h-5" />
              Start First Analysis
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-purple-400" />
                  <span className="text-3xl font-bold text-white">{analytics.totalAnalyses}</span>
                </div>
                <p className="text-purple-200/60 text-sm">Total Analyses</p>
              </div>

              {analytics.topEmotion && (
                <div className={`relative bg-gradient-to-br ${getEmotionColor(analytics.topEmotion[0])} rounded-2xl p-6 overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <TrendingUp className="w-8 h-8 text-white mb-2" />
                    <p className="text-2xl font-bold text-white capitalize">{analytics.topEmotion[0]}</p>
                    <p className="text-white/80 text-sm">Top Emotion</p>
                  </div>
                </div>
              )}

              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-fuchsia-400" />
                  <span className="text-3xl font-bold text-white">{analytics.recentCount}</span>
                </div>
                <p className="text-purple-200/60 text-sm">Recent Sessions</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Average Emotion Distribution
              </h2>
              <div className="space-y-3">
                {analytics.averageEmotions.map(([emotion, score]) => (
                  <div key={emotion}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium capitalize">{emotion}</span>
                      <span className="text-purple-200 text-sm font-mono">{(score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getEmotionColor(emotion)} rounded-full transition-all duration-1000`}
                        style={{ width: `${score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-fuchsia-400" />
                Recent Conversations
              </h2>
              <div className="space-y-3">
                {history.map((item, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all">
                    <p className="text-white text-sm mb-2">{item.text}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getEmotionColor(item.top_emotion)} text-white`}>
                        {item.top_emotion}: {item.percentage.toFixed(1)}%
                      </span>
                      <span className="text-purple-300/60 text-xs">{formatDate(item.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const AnalyzerPage = ({ username, onLogout, onNavigate }) => {
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/analyze`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: result,
              user_id: username,
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();
        setEmotions(data.emotions);
      } catch (err) {
        if (err.name === "AbortError") {
          setErrorMsg("Request timed out. Is your backend running?");
        } else if (err.message.includes("Server Error")) {
          setErrorMsg(err.message);
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

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: "from-yellow-400 to-orange-500",
      sadness: "from-blue-400 to-indigo-600",
      anger: "from-red-500 to-rose-700",
      fear: "from-purple-500 to-violet-700",
      surprise: "from-pink-400 to-fuchsia-600",
      disgust: "from-green-500 to-emerald-700",
      neutral: "from-gray-400 to-slate-600",
    };
    return colors[emotion.toLowerCase()] || "from-cyan-400 to-blue-600";
  };

  const sortedEmotions = emotions
    ? Object.entries(emotions).sort(([, a], [, b]) => b - a)
    : [];

  const topEmotion = sortedEmotions[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 p-6 border-b border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-fuchsia-400" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                    Voice Emotion AI
                  </h1>
                  <p className="text-purple-200/60 text-sm">Analyze your emotions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-purple-200 text-sm transition-all border border-white/10"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-purple-200 text-sm transition-all border border-white/10"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-center mb-8">
              <button
                onClick={startRecording}
                disabled={recording || loading}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${
                  recording 
                    ? "bg-gradient-to-r from-red-500 to-rose-600 opacity-75 animate-pulse" 
                    : "bg-gradient-to-r from-purple-500 to-fuchsia-600 opacity-50 group-hover:opacity-100"
                }`}></div>
                <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  recording
                    ? "bg-gradient-to-br from-red-500 to-rose-600 scale-110"
                    : "bg-gradient-to-br from-purple-600 to-fuchsia-600 group-hover:scale-105"
                }`}>
                  {recording ? (
                    <Waves className="w-12 h-12 text-white animate-pulse" />
                  ) : (
                    <Mic className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                  )}
                </div>
              </button>
            </div>

            <p className="text-center text-purple-200 mb-8 font-medium">
              {recording ? "Listening..." : loading ? "Analyzing..." : "Tap the microphone to start"}
            </p>

            {errorMsg && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{errorMsg}</p>
              </div>
            )}

            {transcript && (
              <div className="mb-6 bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-purple-200/60 text-xs uppercase tracking-wider mb-2">Transcript</p>
                <p className="text-white text-lg italic">"{transcript}"</p>
              </div>
            )}

            {loading && (
              <div className="flex justify-center items-center gap-3 py-8">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            )}

            {emotions && sortedEmotions.length > 0 && (
              <div className="space-y-6">
                {topEmotion && (
                  <div className={`relative bg-gradient-to-br ${getEmotionColor(topEmotion[0])} rounded-2xl p-6 overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                      <p className="text-white/80 text-sm uppercase tracking-wider mb-1">Dominant Emotion</p>
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-4xl font-bold text-white capitalize">{topEmotion[0]}</h3>
                        <span className="text-2xl font-mono text-white/90">{(topEmotion[1] * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <p className="text-purple-200/60 text-xs uppercase tracking-wider">All Detected Emotions</p>
                  {sortedEmotions.map(([emotion, score]) => (
                    <div 
                      key={emotion} 
                      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r ${getEmotionColor(emotion)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      ></div>
                      <div className="relative p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-lg font-semibold text-white capitalize min-w-[100px]">{emotion}</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${getEmotionColor(emotion)} rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${score * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xl font-mono text-purple-200 ml-4">{(score * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-purple-300/40 text-sm">Speak naturally and let AI decode your emotions</p>
        </div>
      </div>
    </div>
  );
};

export default App;