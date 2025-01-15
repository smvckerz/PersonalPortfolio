import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import TypedLine from "./TypedLine";

function Home() {
  const [lines, setLines] = useState([
    "Welcome to my Console!",
    "This website is my personal portfolio show casing my skills and also providing you information about myself.",
    "You may be wondering why out of all things I could have created, why a console?",
    "Well, to answer that shortly, to stand out. I was working in the terminal one day and realized I have",
    "never seen anyone do something like this as their portfolio, and figured why not be the first? I am assuming this would be the first one you would come across.",
    "Hope you enjoy my console!",
    "Type 'help' to see available commands.",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentDir, setCurrentDir] = useState("");

  // Our "fake" file system:
  const [fileSystem, setFileSystem] = useState({
    "": {
      directories: ["projects"],
      files: ["about.txt", "contacts.txt", "resume.pdf"]
    },
    projects: {
      directories: [],
      files: ["project1.txt", "project2.txt"]
    }
  });

  const outputRef = useRef(null);
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Tab completion (optional):
  const validCommands = ["help", "about", "clear", "ls", "cd", "mkdir", "touch"];

  const handleCommand = (cmd) => {
    const parts = cmd.trim().split(" ");
    const baseCmd = parts[0].toLowerCase();
    const arg = parts[1] || ""; // e.g. for "cd projects", arg = "projects"

    switch (baseCmd) {
      case "help":
        return [
          "",
          "Available commands:",
          "  help       -> Show this message",
          "  about      -> Info about me",
          "  clear      -> Clear the console",
          "  ls         -> List files/dirs in current directory",
          "  cd [dir]   -> Change directory",
          "  mkdir [d]  -> Create new directory",
          "  touch [f]  -> Create new file",
          ""
        ];
      case "about":
        return [
          "I'm an up and coming software developer wanting to expand my connections and showcase my skills!"
        ];
      case "clear":
        // We'll handle clearing in onSubmitCommand
        return null;
      case "ls":
        // list files & directories in currentDir
        if (fileSystem[currentDir]) {
          const { directories, files } = fileSystem[currentDir];
          const listing = [...directories, ...files];
          return [listing.join(" ") || "Directory is empty."];
        } else {
          return [`Error: current directory '${currentDir}' not found!`];
        }
      case "cd":
        // Switch directories if it exists in the currentDir's 'directories'
        if (!arg) {
          return ["Usage: cd [dirname]"];
        }
        if (arg === "..") {
          // If you want parent dir logic, you'd need to store a 'parent' link or something
          // For now, let's just go back to root if arg is ".."
          setCurrentDir("");
          return [`Now in root directory.`];
        } else {
          // Check if 'arg' is one of the directories in the currentDir
          if (fileSystem[currentDir]?.directories.includes(arg)) {
            setCurrentDir(arg);
            return [`Switched directory to '${arg}'`];
          } else {
            return [`Directory not found: ${arg}`];
          }
        }
      case "mkdir":
        // Create a new directory inside the currentDir
        if (!arg) {
          return ["Usage: mkdir [dirname]"];
        }
        // 1) create an entry in fileSystem for the new dir
        setFileSystem((prev) => {
          const copy = { ...prev };
          copy[arg] = { directories: [], files: [] }; // blank
          // 2) push it into the currentDir's directories
          copy[currentDir].directories.push(arg);
          return copy;
        });
        return [`Created directory '${arg}' in ${currentDir || "root"}.`];
      case "touch":
        // Create a new file inside the currentDir
        if (!arg) {
          return ["Usage: touch [filename]"];
        }
        setFileSystem((prev) => {
          const copy = { ...prev };
          copy[currentDir].files.push(arg);
          return copy;
        });
        return [`Created file '${arg}' in ${currentDir || "root"}.`];
      default:
        if (cmd.trim() === "") {
          return []; // no output for empty command
        } else {
          return [`'${cmd}' is not recognized as a valid command.`];
        }
    }
  };

  // KeyDown for Tab completion
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = inputValue.toLowerCase();
      const match = validCommands.find((c) => c.startsWith(partial));
      if (match) {
        setInputValue(match);
      }
    }
  };

  // onSubmitCommand
  const onSubmitCommand = (e) => {
    e.preventDefault();
    const command = inputValue.trim();

    // Display the user’s command
    setLines((prev) => [...prev, `C:\\Users\\${currentDir}> ${command}`]);

    const output = handleCommand(command);

    if (command.toLowerCase() === "clear") {
      setLines([]);
    } else if (output && output.length > 0) {
      setLines((prev) => [...prev, ...output]);
    }
    setInputValue("");
  };

  return (
    <div className="console-container">
      <div className="output-lines" ref={outputRef}>
        {lines.map((line, i) =>
          typeof line === "object" && line.typed ? (
            <TypedLine key={i} text={line.content} />
          ) : (
            <div key={i} className="line">
              {line}
            </div>
          )
        )}
      </div>

      <form onSubmit={onSubmitCommand} className="prompt">
        <span className="prompt-label">C:\Users\{currentDir}&gt;</span>
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