import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="relative min-h-screen flex justify-center items-center font-sans text-white">
      {/* 🔳 Grid background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* 🔵 Blurred background blob */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />

      <Home />
    </div>
  );
}

export default App;
