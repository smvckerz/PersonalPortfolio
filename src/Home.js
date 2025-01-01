// Home.js
import React, { useState, useEffect, useRef } from "react";
import "./Home.css"; // We'll define the CSS next

function Home() {
  // Lines that appear in the console
  const [lines, setLines] = useState([
    "Welcome to my React Console!",
    "Type 'help' to see available commands.",
  ]);

  // Current input value
  const [inputValue, setInputValue] = useState("");

  // Ref for auto-scrolling to bottom
  const outputRef = useRef(null);

  // Auto-scroll whenever lines update
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Command handler
  const handleCommand = (cmd) => {
    switch (cmd.toLowerCase()) {
      case "help":
        return [
          "",
          "Available commands:",
          "  help    -> Show this message",
          "  about   -> Info about me",
          "  clear   -> Clear the console",
          "",
        ];
      case "about":
        return ["I'm a software developer building cool stuff!"];
      case "clear":
        // We'll handle clearing in the main function
        return null;
      default:
        if (cmd.trim() === "") {
          return []; // no output for empty commands
        } else {
          return [`'${cmd}' is not recognized as a valid command.`];
        }
    }
  };

  // Form submission
  const onSubmitCommand = (e) => {
    e.preventDefault();
    const command = inputValue.trim();

    // Display the user's typed command
    setLines((prev) => [...prev, `C:\\Users\\Guest> ${command}`]);

    // Get the response from our command handler
    const output = handleCommand(command);

    if (command.toLowerCase() === "clear") {
      // Clear the console entirely
      setLines([]);
    } else if (output && output.length > 0) {
      // Append command output
      setLines((prev) => [...prev, ...output]);
    }

    // Clear the input
    setInputValue("");
  };

  return (
    <div className="console-container">
      {/* Output area */}
      <div className="output-lines" ref={outputRef}>
        {lines.map((line, index) => (
          <div key={index} className="line">
            {line}
          </div>
        ))}
      </div>

      {/* Command prompt input */}
      <form onSubmit={onSubmitCommand} className="prompt">
        <span className="prompt-label">C:\Users\Guest&gt;</span>
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
