import { useState } from "react";

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("user_id", name.trim());  // Save user id to local storage
      onLogin(name.trim());  // Trigger the onLogin function to update the state in App.js
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-white text-center mb-4">Enter Your Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. john_doe"
          className="w-full px-4 py-2 rounded bg-white/20 text-white mb-4 outline-none"
        />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;
