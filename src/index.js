// ===== index.js =====
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";    // Our global reset & body styles
import App from "./App"; // The root component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
