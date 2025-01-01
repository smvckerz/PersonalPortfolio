// ===== App.js =====
import React, { useState, useEffect } from "react";
import "./App.css";        // Global-ish styles for the App container
import PreLoader from "./PreLoader";
import Home from "./Home"; // The console component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time of 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? <PreLoader /> : <Home />}
    </div>
  );
}

export default App;
