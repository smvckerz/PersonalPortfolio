import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import TypedLine from "./TypedLine";
import EditorModal from "./EditorModel";

function Home() {
  const [lines, setLines] = useState([
    "Welcome to my Console!",
    "This website is my personal portfolio show casing my skills and also providing you information about myself.",
    "You may be wondering why out of all things I could have created, why a console?",
    "Well, to answer that shortly, to stand out. I was working in the terminal one day and realized I have",
    "never seen anyone do something like this as their portfolio, and figured why not be the first? I am assuming this would be the first one you would come across.",
    "Hope you enjoy my console!",
    "P.S. If you would prefer to look at a normal page, please just type: normal",
    "Type 'help' to see available commands.",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentDir, setCurrentDir] = useState("");

  const [fileSystem, setFileSystem] = useState({
    "": {
      directories: ["projects"],
      files: [
        {name: "about.txt", content: "I am a "},
        {},
        {},
        "about.txt", "contacts.txt", "resume.pdf"]
    },
    projects: {
      directories: [],
      files: ["project1.txt", "project2.txt"]
    }
  });

  const [editingFile, setEditingFile] = useState(null);

  const outputRef = useRef(null);
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const validCommands = ["help", "about", "clear", "ls", "cd", "mkdir", "touch"];

  const handleCommand = (cmd) => {
    const parts = cmd.trim().split(" ");
    const baseCmd = parts[0].toLowerCase();
    const arg = parts[1] || "";

    switch (baseCmd) {
      case "help":
        return [
          "",
          "Available commands:",
          "  help       -> Show this message",
          "  about      -> Info about me",
          "  clear      -> Clear the console",
          "  ls         -> List files/dirs in current directory",
          "  ls -l      -> List files/dirs with detailed info",
          "  cd [dir]   -> Change directory",
          "  mkdir [d]  -> Create new directory",
          "  touch [f]  -> Create new file",
          "  edit [f]   -> Edit a file",
          ""
        ];
      case "about":
        return [
          "I'm an up and coming software developer wanting to expand my connections and showcase my skills!"
        ];
      case "clear":

        return null;
      case "ls":
        if (fileSystem[currentDir]) {
          const { directories, files } = fileSystem[currentDir];
          const listing = [...directories, ...files];
          return [listing.join(" ") || "Directory is empty."];
        } else {
          return [`Error: current directory '${currentDir}' not found!`];
        }
      case "cd":
        if (!arg) {
          return ["Usage: cd [dirname]"];
        }
        if (arg === "..") {
          setCurrentDir("");
          return [`Now in root directory.`];
        } else {
          if (fileSystem[currentDir]?.directories.includes(arg)) {
            setCurrentDir(arg);
            return [`Switched directory to '${arg}'`];
          } else {
            return [`Directory not found: ${arg}`];
          }
        }
      case "mkdir":
        if (!arg) {
          return ["Usage: mkdir [dirname]"];
        }
        setFileSystem((prev) => {
          const copy = { ...prev };
          copy[arg] = { directories: [], files: [] }; 
          copy[currentDir].directories.push(arg);
          return copy;
        });
        return [`Created directory '${arg}' in ${currentDir || "root"}.`];
      case "touch":
        if (!arg) {
          return ["Usage: touch [filename]"];
        }
        setFileSystem((prev) => {
          const copy = { ...prev };
          copy[currentDir].files.push({name: arg, content: ""});
          return copy;
        });
        return [`Created file '${arg}' in ${currentDir || "root"}.`];
      default:
        if (cmd.trim() === "") {
          return [];
        } else {
          return [`'${cmd}' is not recognized as a valid command.`];
        }

      case "mv": 
        const fileName = parts[1];
        const targetDir = parts[2];

        const fileIndex = fileSystem[currentDir].files.fileIndex(f => f.name === fileName);

        if(fileIndex === -1)
        {
          return ['File `${targetDir` does not exist.'];
        }

        const [movingFile] = fileSystem[currentDir].files.splice(fileIndex, 1);

        fileSystem[targetDir].files.push(movingFile);

        setFileSystem({...fileSystem});

        return ('Moved `${fileName}` from `${currentDir` to `${targetDir}`.');

        case "python": {
          const fileName = parts[1];
          const file = fileSystem[currentDir].items.find(item => item.name === fileName);
          if (!file) {
            return [`File '${fileName}' not found.`];
          }
          fetch("http://192.168.1.175:4000/run-python", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: file.content })
          })
            .then(res => res.json())
            .then(data => {
              if (data.error) {
                setLines(prev => [...prev, data.error]);
              } else {
                setLines(prev => [...prev, data.output]);
              }
            })
            .catch(err => {
              setLines(prev => [...prev, String(err)]);
            });
        
          return [`Executing Python code in '${fileName}'...`];
        }

        case "edit": {
          if (!arg) {
            return ["Usage: edit [filename]"];
          }
    
          const fileIndex = fileSystem[currentDir].items.findIndex(
            (item) => item.name === arg && !item.isDirectory
          );
    
          if (fileIndex === -1) {
            return [`File '${arg}' not found in ${currentDir || "root"}.`];
          }
    
          setEditingFile({
            ...fileSystem[currentDir].items[fileIndex],
            path: currentDir,
            index: fileIndex,
          });
    
          return [`Editing file '${arg}'.`];
        }

        case "cat": {
          if (!arg) {
            return ["Usage: cat [filename]"];
          }
        
          const fileObj = fileSystem[currentDir].items.find(
            (item) => item.name === arg && !item.isDirectory
          );
        
          if (!fileObj) {
            return [`File '${arg}' not found in ${currentDir || "root"}.`];
          }
        
          return [fileObj.content || ""];
        }
    }
  };

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

  const onSubmitCommand = (e) => {
    e.preventDefault();
    const command = inputValue.trim();

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