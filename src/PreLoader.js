// ===== PreLoader.js =====
import React from "react";
import "./PreLoader.css";

function PreLoader() {
  return (
    <div className="preloader-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default PreLoader;
