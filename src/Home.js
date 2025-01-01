// Home.js
import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import TypedLine from "./TypedLine"; // Our new typed component

function Home() {
  const [lines, setLines] = useState([
    { content: "Welcome to my React Console!", typed: true },
    { content: "Type 'help' to see available commands.", typed: true }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const outputRef = useRef(null);

  // Scroll to bottom on new lines
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd) => {
    switch (cmd.toLowerCase()) {
      case "help":
        return [
          { content: "", typed: false },
          { content: "Available commands:", typed: true },
          { content: "  help    -> Show this message", typed: true },
          { content: "  about   -> Info about me", typed: true },
          { content: "  clear   -> Clear the console", typed: true },
          { content: "", typed: false }
        ];
      case "about":
        return [{ content: "I'm a software developer building cool stuff!", typed: true }];
      case "clear":
        return null;
      default:
        if (cmd.trim() === "") {
          return [];
        } else {
          return [{ content: `'${cmd}' is not recognized as a valid command.`, typed: true }];
        }
    }
  };

  const onSubmitCommand = (e) => {
    e.preventDefault();
    const command = inputValue.trim();

    // The user’s typed command shows up immediately (typed = false),
    // because we want it to appear at once.
    setLines((prev) => [
      ...prev,
      { content: `C:\\Users\\Recruiter> ${command}`, typed: false }
    ]);

    const output = handleCommand(command);
    if (command.toLowerCase() === "clear") {
      setLines([]);
    } else if (output && output.length > 0) {
      // Append the typed or non-typed lines
      setLines((prev) => [...prev, ...output]);
    }

    setInputValue("");
  };

  return (
    <div className="console-container">
      <div className="output-lines" ref={outputRef}>
        {lines.map((lineObj, index) => {
          // if typed is true, use the TypedLine component
          if (lineObj.typed) {
            return (
              <TypedLine
                key={index}
                text={lineObj.content}
                // optional onComplete if you want to do something after each line finishes
              />
            );
          }
          // otherwise, just show it as plain text
          return (
            <div key={index} className="line">
              {lineObj.content}
            </div>
          );
        })}
      </div>

      <form onSubmit={onSubmitCommand} className="prompt">
        <span className="prompt-label">C:\Users\Recruiter&gt;</span>
        <input
          className="prompt-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
}

export default Home;
