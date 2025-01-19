import React, { useState, useEffect } from "react";

function TypedLine({ text, onComplete, typingSpeed = 50 }) {

  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed, onComplete]);

  return <div className="line">{displayed}</div>;
}

export default TypedLine;
