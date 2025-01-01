import React from "react";
import "./PreLoader.css";

function PreLoader() {
  return (
    <div className="preloader-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default PreLoader;
