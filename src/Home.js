// import React, { useState, useEffect, useRef } from "react";
// import "./Home.css";
// import TypedLine from "./TypedLine";
// import EditorModel from "./EditorModel"; // Import the EditorModal component

// function Home() {
//   const [lines, setLines] = useState([
//     "Welcome to my Console!",
//     "This website is my personal portfolio show casing my skills and also providing you information about myself.",
//     "You may be wondering why out of all things I could have created, why a console?",
//     "Well, to answer that shortly, to stand out. I was working in the terminal one day and realized I have",
//     "never seen anyone do something like this as their portfolio, and figured why not be the first? I am assuming this would be the first one you would come across.",
//     "Hope you enjoy my console!",
//     "P.S. If you would prefer to look at a normal page, please just type: normal",
//     "Type 'help' to see available commands.",
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [currentDir, setCurrentDir] = useState("");

//   // Our "fake" file system:
//   const [fileSystem, setFileSystem] = useState({
//     "": {
//       directories: ["projects"],
//       files: [
//         { name: "about.txt", content: "I'm a passionate developer..." },
//         { name: "contacts.txt", content: "Email: example@domain.com" },
//         { name: "resume.pdf", content: "PDF content placeholder" }
//       ]
//     },
//     projects: {
//       directories: [],
//       files: [
//         { name: "project1.txt", content: "E-commerce platform using React/Node" },
//         { name: "project2.txt", content: "ML classification system" }
//       ]
//     }
//   });

//   const [editingFile, setEditingFile] = useState(null);

//   const outputRef = useRef(null);
//   useEffect(() => {
//     if (outputRef.current) {
//       outputRef.current.scrollTop = outputRef.current.scrollHeight;
//     }
//   }, [lines]);

//   // Tab completion (optional):
//   const validCommands = ["help", "about", "clear", "ls", "cd", "mkdir", "touch"];

//   const handleCommand = (cmd) => {
//     const parts = cmd.trim().split(" ");
//     const baseCmd = parts[0].toLowerCase();
//     const arg = parts[1] || ""; // e.g. for "cd projects", arg = "projects"

//     switch (baseCmd) {
//       case "help":
//         return [
//           "",
//           "Available commands:",
//           "  help       -> Show this message",
//           "  about      -> Info about me",
//           "  clear      -> Clear the console",
//           "  ls         -> List files/dirs in current directory",
//           "  ls -l      -> List files/dirs with detailed info",
//           "  cd [dir]   -> Change directory",
//           "  mkdir [d]  -> Create new directory",
//           "  touch [f]  -> Create new file",
//           "  edit [f]   -> Edit a file",
//           ""
//         ];
//       case "about":
//         return [
//           "I'm an up and coming software developer wanting to expand my connections and showcase my skills!"
//         ];
//       case "clear":
//         // We'll handle clearing in onSubmitCommand
//         return null;
//       case "ls":
//         // list files & directories in currentDir
//         if (fileSystem[currentDir]) {
//           const { directories, files } = fileSystem[currentDir];
//           const listing = [...directories, ...files];
//           return [listing.join(" ") || "Directory is empty."];
//         } else {
//           return [`Error: current directory '${currentDir}' not found!`];
//         }
//       case "cd":
//         // Switch directories if it exists in the currentDir's 'directories'
//         if (!arg) {
//           return ["Usage: cd [dirname]"];
//         }
//         if (arg === "..") {
//           // If you want parent dir logic, you'd need to store a 'parent' link or something
//           // For now, let's just go back to root if arg is ".."
//           setCurrentDir("");
//           return [`Now in root directory.`];
//         } else {
//           // Check if 'arg' is one of the directories in the currentDir
//           if (fileSystem[currentDir]?.directories.includes(arg)) {
//             setCurrentDir(arg);
//             return [`Switched directory to '${arg}'`];
//           } else {
//             return [`Directory not found: ${arg}`];
//           }
//         }
//       case "mkdir":
//         // Create a new directory inside the currentDir
//         if (!arg) {
//           return ["Usage: mkdir [dirname]"];
//         }
//         // 1) create an entry in fileSystem for the new dir
//         setFileSystem((prev) => {
//           const copy = { ...prev };
//           copy[arg] = { directories: [], files: [] }; // blank
//           // 2) push it into the currentDir's directories
//           copy[currentDir].directories.push(arg);
//           return copy;
//         });
//         return [`Created directory '${arg}' in ${currentDir || "root"}.`];
//       case "touch":
//         // Create a new file inside the currentDir
//         if (!arg) {
//           return ["Usage: touch [filename]"];
//         }
//         setFileSystem((prev) => {
//           const copy = { ...prev };
//           copy[currentDir].files.push({ name: arg, content: "" });
//           return copy;
//         });
//         return [`Created file '${arg}' in ${currentDir || "root"}.`];
//       default:
//         if (cmd.trim() === "") {
//           return []; // no output for empty command
//         } else {
//           return [`'${cmd}' is not recognized as a valid command.`];
//         }

//       case "mv":
//         if (parts.length < 3) return ["Usage: mv [filename] [destination]"];

//         const fileName = parts[1];
//         const targetDir = parts[2];

//         return setFileSystem(prev => {
//           const newFS = JSON.parse(JSON.stringify(prev)); // Deep clone

//           // Find file in current directory
//           const fileIndex = newFS[currentDir].files.findIndex(f => f.name === fileName);
//           if (fileIndex === -1) return prev;

//           // Verify target directory exists
//           if (!newFS[targetDir]) return prev;

//           // Move file
//           const [movedFile] = newFS[currentDir].files.splice(fileIndex, 1);
//           newFS[targetDir].files.push(movedFile);

//           return newFS;
//         });

//       // case "mv": 
//       //   const fileName = parts[1];
//       //   const targetDir = parts[2];

//       //   const fileIndex = fileSystem[currentDir].files.fileIndex(f => f.name === fileName);

//       //   if(fileIndex === -1)
//       //   {
//       //     return ['File `${targetDir` does not exist.'];
//       //   }

//       //   const [movingFile] = fileSystem[currentDir].files.splice(fileIndex, 1);

//       //   fileSystem[targetDir].files.push(movingFile);

//       //   setFileSystem({...fileSystem});

//       //   return ('Moved `${fileName}` from `${currentDir` to `${targetDir}`.');

//       case "python": {
//         const fileName = parts[1];
//         if (!fileName) return ["Specify a file to execute"];
        
//         const file = fileSystem[currentDir].files.find(f => f.name === fileName);
//         if (!file) return [`File not found: ${fileName}`];
      
//         setLines(prev => [...prev, `Executing ${fileName}...`]);
      
//         fetch("http://your-pi-ip:4000/execute", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ code: file.content })
//         })
//         .then(response => response.json())
//         .then(data => {
//           setLines(prev => [
//             ...prev,
//             data.output || "No output",
//             data.error ? `Error: ${data.error}` : ""
//           ]);
//         })
//         .catch(error => {
//           setLines(prev => [...prev, `Execution failed: ${error.message}`]);
//         });
      
//         return [];
//       }

//       // case "python": {
//       //   // user typed: python myScript.py
//       //   const fileName = parts[1];
//       //   // find that file in your fake file system:
//       //   const file = fileSystem[currentDir].items.find(item => item.name === fileName);
//       //   if (!file) {
//       //     return [`File '${fileName}' not found.`];
//       //   }
//       //   // send 'file.content' to your Pi's API
//       //   fetch("http://192.168.1.175:4000/run-python", {
//       //     method: "POST",
//       //     headers: { "Content-Type": "application/json" },
//       //     body: JSON.stringify({ code: file.content })
//       //   })
//       //     .then(res => res.json())
//       //     .then(data => {
//       //       if (data.error) {
//       //         // display error
//       //         setLines(prev => [...prev, data.error]);
//       //       } else {
//       //         // display output
//       //         setLines(prev => [...prev, data.output]);
//       //       }
//       //     })
//       //     .catch(err => {
//       //       setLines(prev => [...prev, String(err)]);
//       //     });

//       //   return [`Executing Python code in '${fileName}'...`];
//       // }

//       case "edit": {
//         if (!arg) {
//           return ["Usage: edit [filename]"];
//         }

//         // Find the file in the current directory
//         const fileToEdit = fileSystem[currentDir].files.find(f => f.name === arg);

//         if (fileIndex === -1) {
//           return [`File '${arg}' not found in ${currentDir || "root"}.`];
//         }

//         // Set the file to be edited
//         setEditingFile({
//           ...fileSystem[currentDir].items[fileToEdit],
//           path: currentDir, // Optional: track the directory path
//           index: fileIndex, // Track the file's index for updates
//         });

//         return [`Editing file '${arg}'.`];
//       }

//       case "cat":
//         {
//           if (!arg) return ["Usage: cat [filename]"];
        
//           const targetFile = fileSystem[currentDir].files.find(f => f.name === arg);
//           if (!targetFile) return [`File not found: ${arg}`];
          
//           return [targetFile.content];
//         }
//   };

//   // KeyDown for Tab completion
//   const handleKeyDown = (e) => {
//     if (e.key === "Tab") {
//       e.preventDefault();
//       const partial = inputValue.toLowerCase();
//       const match = validCommands.find((c) => c.startsWith(partial));
//       if (match) {
//         setInputValue(match);
//       }
//     }
//   };

//   // onSubmitCommand
//   const onSubmitCommand = (e) => {
//     e.preventDefault();
//     const command = inputValue.trim();

//     // Display the user’s command
//     setLines((prev) => [...prev, `C:\\Users\\${currentDir}> ${command}`]);

//     const output = handleCommand(command);

//     if (command.toLowerCase() === "clear") {
//       setLines([]);
//     } else if (output && output.length > 0) {
//       setLines((prev) => [...prev, ...output]);
//     }
//     setInputValue("");
//   };

//   return (
//     <div className="console-container">
//       <div className="output-lines" ref={outputRef}>
//         {lines.map((line, i) =>
//           typeof line === "object" && line.typed ? (
//             <TypedLine key={i} text={line.content} />
//           ) : (
//             <div key={i} className="line">
//               {line}
//             </div>
//           )
//         )}
//       </div>

//       <form onSubmit={onSubmitCommand} className="prompt">
//         <span className="prompt-label">C:\Users\{currentDir}&gt;</span>
//         <input
//           className="prompt-input"
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           autoFocus
//         />
//       </form>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import TypedLine from "./TypedLine";
<<<<<<< HEAD
import EditorModal from "./EditorModal";
=======
import EditorModal from "./EditorModel";
>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b

function Home() {
  const [lines, setLines] = useState([
    "Welcome to my Console!",
    "Type 'help' to see available commands.",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentDir, setCurrentDir] = useState("");

  const [fileSystem, setFileSystem] = useState({
    "": {
      directories: ["projects"],
      files: [
        { name: "about.txt", content: "I'm a passionate developer..." },
        { name: "contacts.txt", content: "Email: example@domain.com" },
        { name: "resume.pdf", content: "PDF content placeholder" }
      ]
    },
    projects: {
      directories: [],
      files: [
        { name: "project1.txt", content: "E-commerce platform using React/Node" },
        { name: "project2.txt", content: "ML classification system" }
      ]
    }
  });

  const [editingFile, setEditingFile] = useState(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

<<<<<<< HEAD
  const validCommands = ["help", "about", "clear", "ls", "cd", "mkdir", "touch", "mv", "python", "edit", "cat", "rm"];
=======
  const validCommands = ["help", "about", "clear", "ls", "cd", "mkdir", "touch"];
>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b

  const handleCommand = (cmd) => {
    const parts = cmd.trim().split(" ");
    const baseCmd = parts[0].toLowerCase();
    const arg = parts[1] || "";
<<<<<<< HEAD
    const arg2 = parts[2] || "";
=======
>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b

    switch (baseCmd) {
      case "help":
        return [
          "",
          "Available commands:",
          "  help       - Show this message",
          "  clear      - Clear console",
          "  ls         - List directory contents",
          "  cd [dir]   - Change directory",
          "  mkdir [d]  - Create directory",
          "  touch [f]  - Create file",
          "  mv [f] [d] - Move file",
          "  edit [f]   - Edit file",
          "  cat [f]    - View file",
          "  rm [f]     - Delete file",
          "  python [f] - Execute Python script",
          ""
        ];

      case "clear":
<<<<<<< HEAD
=======

>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b
        return null;

      case "ls":
        if (fileSystem[currentDir]) {
          const dirs = fileSystem[currentDir].directories.map(d => `${d}/`);
          const files = fileSystem[currentDir].files.map(f => f.name);
          return [...dirs, ...files];
        }
        return [`Directory not found: ${currentDir}`];

      case "cd":
<<<<<<< HEAD
        if (!arg) return ["Usage: cd [directory]"];
        if (arg === "..") {
          const pathParts = currentDir.split('/').filter(p => p);
          pathParts.pop();
          setCurrentDir(pathParts.join('/'));
          return [`Moved to parent directory`];
=======
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
>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b
        }
        if (fileSystem[currentDir]?.directories.includes(arg)) {
          setCurrentDir(prev => prev ? `${prev}/${arg}` : arg);
          return [`Changed directory to ${arg}`];
        }
        return [`Directory not found: ${arg}`];

      case "mkdir":
<<<<<<< HEAD
        if (!arg) return ["Usage: mkdir [name]"];
        if (!/^[\w\-]+$/.test(arg)) return ["Invalid directory name"];
        setFileSystem(prev => ({
          ...prev,
          [currentDir]: {
            ...prev[currentDir],
            directories: [...prev[currentDir].directories, arg]
          }
        }));
        return [`Created directory: ${arg}`];

      case "touch":
        if (!arg) return ["Usage: touch [filename]"];
        if (!/^[\w\-\.]+$/.test(arg)) return ["Invalid filename"];
        setFileSystem(prev => ({
          ...prev,
          [currentDir]: {
            ...prev[currentDir],
            files: [...prev[currentDir].files, { name: arg, content: "" }]
          }
        }));
        return [`Created file: ${arg}`];

      case "mv":
        if (parts.length < 3) return ["Usage: mv [file] [destination]"];
        return setFileSystem(prev => {
          const newFS = JSON.parse(JSON.stringify(prev));
          const fileIndex = newFS[currentDir].files.findIndex(f => f.name === arg);
          if (fileIndex === -1) return prev;
          if (!newFS[arg2]) return prev;
          const [movedFile] = newFS[currentDir].files.splice(fileIndex, 1);
          newFS[arg2].files.push(movedFile);
          return newFS;
=======
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
>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b
        });

      case "python": {
        const file = fileSystem[currentDir].files.find(f => f.name === arg);
        if (!file) return [`File not found: ${arg}`];
        setLines(prev => [...prev, `Executing ${arg}...`]);
        fetch(`${process.env.REACT_APP_API_URL}/execute`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: file.content })
        })
          .then(res => res.json())
          .then(data => setLines(prev => [...prev, data.output || "", data.error || ""]))
          .catch(err => setLines(prev => [...prev, `Error: ${err.message}`]));
        return [];
      }

      case "edit":
        if (!arg) return ["Usage: edit [filename]"];
        const fileToEdit = fileSystem[currentDir].files.find(f => f.name === arg);
        if (!fileToEdit) return [`File not found: ${arg}`];
        setEditingFile({ ...fileToEdit, path: currentDir });
        return [`Editing ${arg} - Type :wq to save`];

      case "cat":
        if (!arg) return ["Usage: cat [filename]"];
        const targetFile = fileSystem[currentDir].files.find(f => f.name === arg);
        return targetFile ? [targetFile.content] : [`File not found: ${arg}`];

      case "rm":
        if (!arg) return ["Usage: rm [filename]"];
        setFileSystem(prev => ({
          ...prev,
          [currentDir]: {
            ...prev[currentDir],
            files: prev[currentDir].files.filter(f => f.name !== arg)
          }
        }));
        return [`Deleted file: ${arg}`];

      default:
<<<<<<< HEAD
        return cmd.trim() ? [`Command not found: ${cmd}`] : [];
=======
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
>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const match = validCommands.find(c => c.startsWith(inputValue.toLowerCase()));
      if (match) setInputValue(match);
    }
  };

  const onSubmitCommand = (e) => {
    e.preventDefault();
    const command = inputValue.trim();
<<<<<<< HEAD
    setLines(prev => [...prev, `C:\\${currentDir || "root"}> ${command}`]);
    
=======

    setLines((prev) => [...prev, `C:\\Users\\${currentDir}> ${command}`]);

    const output = handleCommand(command);

>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b
    if (command.toLowerCase() === "clear") {
      setLines([]);
    } else {
      const output = handleCommand(command);
      if (output) setLines(prev => [...prev, ...output]);
    }
    
    setInputValue("");
  };

  return (
    <div className="console-container">
      <div className="output-lines" ref={outputRef}>
        {lines.map((line, i) => (
          <div key={i} className="line">{line}</div>
        ))}
      </div>

      <form onSubmit={onSubmitCommand} className="prompt">
        <span className="prompt-label">C:\{currentDir || "root"}&gt;</span>
        <input
          className="prompt-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </form>

      {editingFile && (
        <EditorModal
          file={editingFile}
          onSave={(content) => {
            setFileSystem(prev => ({
              ...prev,
              [editingFile.path]: {
                ...prev[editingFile.path],
                files: prev[editingFile.path].files.map(f => 
                  f.name === editingFile.name ? {...f, content} : f
                )
              }
            }));
            setEditingFile(null);
          }}
          onCancel={() => setEditingFile(null)}
        />
      )}
    </div>
  );
}

export default Home;