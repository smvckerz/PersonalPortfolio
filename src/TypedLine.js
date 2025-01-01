// TypedLine.js
import React, { useState, useEffect } from "react";

function TypedLine({ text, onComplete, typingSpeed = 50 }) {
  /*
    text        -> The entire string to type out
    onComplete  -> Callback when typing is finished (optional)
    typingSpeed -> ms between each character
  */
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      // Add the next character
      setDisplayed((prev) => prev + text.charAt(index));
      index++;

      // If we've typed the entire string, stop
      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete(); // notify parent if needed
      }
    }, typingSpeed);

    // Cleanup if component unmounts early
    return () => clearInterval(interval);
  }, [text, typingSpeed, onComplete]);

  return <div className="line">{displayed}</div>;
}

export default TypedLine;
