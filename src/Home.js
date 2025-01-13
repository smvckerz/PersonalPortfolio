// Home.js
import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import TypedLine from "./TypedLine";

function Home() {
    const [lines, setLines] = useState([
        "Welcome to my Console!",
        "Type 'help' to see available commands.",
    ]);
    const [inputValue, setInputValue] = useState("");

    // For auto-scrolling to the bottom
    const outputRef = useRef(null);

    // Scroll to the bottom whenever `lines` changes
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [lines]);

    // An optional array of valid commands for tab-completion
    const validCommands = ["help", "about", "clear"];

    const fileSystem = {
        '': ['about.txt', 'contacts.txt', 'resume.pdf', 'projects'],
        'projects': ['project1', 'project2'],
      };

    // The command interpreter
    const handleCommand = (cmd) => {
        switch (cmd.toLowerCase()) {
            case "help":
                return [
                    "                   ",
                    "Available commands:",
                    "  help  -> Show this message",
                    "  about -> Info about me",
                    "  clear -> Clear the console",
                ];

            case "ls": {
                const items = fileSystem[""]; 
                // Return a single string with items separated by spaces
                return [items.join("  ")]; 
                }
                
            case "about":
                return ["I'm a software developer wanting to expand my connections and showcasing my skills! To see projects, please use projects command to list a few of my projects."];
            case "clear":
                // We'll handle clearing in the onSubmitCommand
                return null;
            default:
                if (cmd.trim() === "") {
                    return [];
                } else {
                    return [`'${cmd}' is not recognized as a valid command.`];
                }
        }
    };

    // Handle tab-completion
    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const partial = inputValue.toLowerCase();
            const match = validCommands.find((cmd) => cmd.startsWith(partial));
            if (match) {
                setInputValue(match);
            }
        }
    };

    // When the user presses Enter (form submission)
    function onSubmitCommand(e) {
        e.preventDefault();
        const command = inputValue.trim();

        // 1. Show the typed command in the console (new line at the bottom)
        setLines((prev) => {
            const newLines = [...prev, `C:\\Users\\Recruiter> ${command}`];
            console.log("New lines:", newLines);
            return newLines;
        });

        // 2. Get response lines
        const output = handleCommand(command);

        // 3. If 'clear', reset the console
        if (command.toLowerCase() === "clear") {
            setLines([]);
        } else if (output && output.length > 0) {
            // 4. Append all returned lines
            setLines((prev) => [...prev, ...output]);
        }

        // 5. Clear the input
        setInputValue("");
    }

    return (
        <div className="console-container">
            {/* Scrollable console output */}
            <div className="output-lines" ref={outputRef}>
                {lines.map((line, index) =>
                    typeof line === "object" && line.typed ? (
                        <TypedLine
                            key={index}
                            text={line.content}
                            // optional onComplete if you want to do something after each line finishes
                        />
                    ) : (
                        <div key={index} className="line">
                            {line}
                        </div>
                    )
                )}
            </div>

            {/* Command input prompt */}
            <form onSubmit={onSubmitCommand} className="prompt">
                <span className="prompt-label">C:\Users\Recruiter&gt;</span>
                <input
                    className="prompt-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </form>
        </div>
    );
}

export default Home;