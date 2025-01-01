// ===== Home.js =====
import React, { useState, useRef, useEffect } from "react";
import "./Home.css";

function Home() {
  const [lines, setLines] = useState([
    "Welcome to my C++ Console Portfolio!",
    "Type 'help' or 'Help' to see available commands.",
  ]);
  const [inputValue, setInputValue] = useState("");
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd) => {
    switch (cmd.toLowerCase()) {
      case "help":
        return [
          " ",
          "-------------------------------",
          "Available commands:",
          "  about    -> Show info about me",
          "  projects -> List my projects",
          "  clear    -> Clear the console",
          "  help     -> This message",
          "-------------------------------",
          " "
        ];
      case "about":
        return ["I'm Eduardo Munoz, an up and coming Software Developer."];
      case "projects":
        return [
          "1. Real-Time 3D Renderer",
          "2. Neural Net Playground",
          "3. Custom Game Engine"
        ];
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

  const onSubmitCommand = (e) => {
    e.preventDefault();
    const command = inputValue.trim();

    // Show the user’s input as a new line
    setLines((prev) => [...prev, `C:\\Users\\Guest> ${command}`]);

    const output = handleCommand(command);

    // If the command was 'clear', we remove all lines
    if (command.toLowerCase() === "clear") {
      setLines([]);
    } else if (output && output.length > 0) {
      // Append output lines
      setLines((prev) => [...prev, ...output]);
    }

    // Reset the input
    setInputValue("");
  };

  return (
    <div className="console-container">
      <div className="output-lines" ref={outputRef}>
        {lines.map((line, index) => (
          <div key={index} className="line">{line}</div>
        ))}
      </div>

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
