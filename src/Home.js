// import React, { useState, useEffect, useRef } from "react";
// import "./Home.css";
// import TypedLine from "./TypedLine";
// import EditorModel from "./EditorModel";

// function getDisplayPath(dir) {
//   // If currentDir is empty, just show "root"
//   if (!dir) {
//     return "root";
//   }
//   // Otherwise, prepend "root/" and replace forward slashes with backslashes
//   return `root/${dir}`.replace(/\//g, "\\");
// }

// function Home() {
//   const [lines, setLines] = useState([
//     "Welcome to my Console!",
//     "Type 'help' to see available commands.",
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [currentDir, setCurrentDir] = useState("");

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

//   const validCommands = ["help", "about", "clear", "ls", "cd", "mkdir", "touch", "mv", "python", "edit", "cat", "rm"];

//   const handleCommand = (cmd) => {
//     const parts = cmd.trim().split(" ");
//     const baseCmd = parts[0].toLowerCase();
//     const arg = parts[1] || "";
//     const arg2 = parts[2] || "";

//     switch (baseCmd) {
//       case "help":
//         return [
//           "",
//           "Available commands:",
//           "  help       - Show this message",
//           "  clear      - Clear console",
//           "  ls         - List directory contents",
//           "  cd [dir]   - Change directory",
//           "  mkdir [d]  - Create directory",
//           "  touch [f]  - Create file",
//           "  mv [f] [d] - Move file",
//           "  edit [f]   - Edit file",
//           "  cat [f]    - View file",
//           "  rm [f]     - Delete file",
//           "  python [f] - Execute Python script",
//           ""
//         ];

//       case "clear":
//         return null;

//       case "ls":
//         if (fileSystem[currentDir]) {
//           const dirs = fileSystem[currentDir].directories.map(d => `${d}/`);
//           const files = fileSystem[currentDir].files.map(f => f.name);
//           return [...dirs, ...files];
//         }
//         return [`Directory not found: ${currentDir}`];

//       case "cd":
//         if (!arg) return ["Usage: cd [directory]"];
//         if (arg === "..") {
//           const pathParts = currentDir.split('/').filter(p => p);
//           pathParts.pop();
//           setCurrentDir(pathParts.join('/'));
//           return [`Moved to parent directory`];
//         }
//         if (fileSystem[currentDir]?.directories.includes(arg)) {
//           setCurrentDir(prev => prev ? `${prev}/${arg}` : arg);
//           return [`Changed directory to ${arg}`];
//         }
//         return [`Directory not found: ${arg}`];

//       case "mkdir":
//         if (!arg) return ["Usage: mkdir [name]"];
//         if (!/^[\w\-]+$/.test(arg)) return ["Invalid directory name"];

//         return setFileSystem(prev => {
//           const newFS = { ...prev };

//           newFS[currentDir] = {
//             ...newFS[currentDir],
//             directories: [...newFS[currentDir].directories, arg]
//           };

//           const newDirPath = currentDir ? `${currentDir}/${arg}` : arg;

//           newFS[newDirPath] = {
//             directories: [],
//             files: []
//           };

//           return newFS;
//         });

//       case "touch":
//         if (!arg) return ["Usage: touch [filename]"];
//         if (!/^[\w\-\.]+$/.test(arg)) return ["Invalid filename"];
//         setFileSystem(prev => ({
//           ...prev,
//           [currentDir]: {
//             ...prev[currentDir],
//             files: [...prev[currentDir].files, { name: arg, content: "" }]
//           }
//         }));
//         return [`Created file: ${arg}`];

//       case "mv":
//         if (parts.length < 3) return ["Usage: mv [file] [destination]"];
//         return setFileSystem(prev => {
//           const newFS = JSON.parse(JSON.stringify(prev));
//           const fileIndex = newFS[currentDir].files.findIndex(f => f.name === arg);
//           if (fileIndex === -1) return prev;
//           if (!newFS[arg2]) return prev;
//           const [movedFile] = newFS[currentDir].files.splice(fileIndex, 1);
//           newFS[arg2].files.push(movedFile);
//           return newFS;
//         });

//       case "python": {
//         const file = fileSystem[currentDir].files.find(f => f.name === arg);
//         if (!file) return [`File not found: ${arg}`];
//         setLines(prev => [...prev, `Executing ${arg}...`]);
//         fetch(`${process.env.REACT_APP_API_URL}/execute`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ code: file.content })
//         })
//           .then(res => res.json())
//           .then(data => setLines(prev => [...prev, data.output || "", data.error || ""]))
//           .catch(err => setLines(prev => [...prev, `Error: ${err.message}`]));
//         return [];
//       }

//       case "edit":
//         if (!arg) return ["Usage: edit [filename]"];
//         const fileToEdit = fileSystem[currentDir].files.find(f => f.name === arg);
//         if (!fileToEdit) return [`File not found: ${arg}`];
//         setEditingFile({ ...fileToEdit, path: currentDir });
//         return [`Editing ${arg} - Type :wq to save`];

//       case "cat":
//         if (!arg) return ["Usage: cat [filename]"];
//         const targetFile = fileSystem[currentDir].files.find(f => f.name === arg);
//         return targetFile ? [targetFile.content] : [`File not found: ${arg}`];

//       case "rm":
//         if (!arg) return ["Usage: rm [filename]"];
//         setFileSystem(prev => ({
//           ...prev,
//           [currentDir]: {
//             ...prev[currentDir],
//             files: prev[currentDir].files.filter(f => f.name !== arg)
//           }
//         }));
//         return [`Deleted file: ${arg}`];

//       default:
//         return cmd.trim() ? [`Command not found: ${cmd}`] : [];
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Tab") {
//       e.preventDefault();
//       const match = validCommands.find(c => c.startsWith(inputValue.toLowerCase()));
//       if (match) setInputValue(match);
//     }
//   };

//   const onSubmitCommand = (e) => {
//     e.preventDefault();
//     const command = inputValue.trim();
//     setLines(prev => [...prev, `C:\\${currentDir || "root"}> ${command}`]);

//     if (command.toLowerCase() === "clear") {
//       setLines([]);
//     } else {
//       const output = handleCommand(command);
//       if (output) setLines(prev => [...prev, ...output]);
//     }

//     setInputValue("");
//   };

//   return (
//     <div className="console-container">
//       <div className="output-lines" ref={outputRef}>
//         {lines.map((line, i) => (
//           <div key={i} className="line">{line}</div>
//         ))}
//       </div>

//       <form onSubmit={onSubmitCommand} className="prompt">
//         <span className="prompt-label">
//           {/* C:\{(currentDir || "root").replace(/\//g, "\\")}&gt;  */}
//           C:\{getDisplayPath(currentDir)}&gt;
//         </span>
//         <input
//           className="prompt-input"
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           autoFocus
//         />
//       </form>

//       {editingFile && (
//         <EditorModel
//           file={editingFile}
//           onSave={(content) => {
//             setFileSystem(prev => ({
//               ...prev,
//               [editingFile.path]: {
//                 ...prev[editingFile.path],
//                 files: prev[editingFile.path].files.map(f =>
//                   f.name === editingFile.name ? { ...f, content } : f
//                 )
//               }
//             }));
//             setEditingFile(null);
//           }}
//           onCancel={() => setEditingFile(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default Home;
import React, { useReducer, useState, useEffect, useRef } from 'react';
import EditorModel from './EditorModel';
import './Home.css';
import { fsReducer, initialState } from 'src\commands.js';

export default function Home() {

  const [state, dispatch] = useReducer(fsReducer, initialState);
  const { fileSystem, currentDir, editingFile, running } = state;

  const [lines, setLines] = useState([
    'Welcome to my Console!',
    "Type 'help' to see available commands."
  ]);
  const [inputValue, setInputValue] = useState('');
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const executePython = (code) => {
    dispatch({ type: 'SET_RUNNING', payload: true });
    fetch(`${process.env.REACT_APP_API_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => setLines(prev => [...prev, data.output || '', data.error || '']))
      .catch(err => setLines(prev => [...prev, `Error: ${err.message}`]))
      .finally(() => dispatch({ type: 'SET_RUNNING', payload: false }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    setLines(prev => [...prev, `C:\${currentDir || 'root'}> ${cmd}`]);
    const { lines: out } = handleCommand(cmd, state, dispatch, executePython);
    if (out !== null) {
      setLines(prev => [...prev, ...out]);
    } else {
      setLines([]);
    }
    setInputValue('');
  };

  return (
    <div className="console-container">
      <div className="output-lines" ref={outputRef} role="log">
        {lines.map((l,i) => <div key={i} className="line">{l}</div>)}
      </div>

      <form onSubmit={onSubmit} className="prompt">
        <span className="prompt-label">C:\{(currentDir||'root').replace(/\//g,'\\')}&gt;</span>
        <input
          className="prompt-input"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          disabled={running}
          autoFocus
        />
      </form>

      {editingFile && (
        <EditorModel
          file={editingFile}
          onSave={(content) => dispatch({
            type: 'SAVE_EDIT',
            payload: { ...editingFile, content }
          })}
          onCancel={() => dispatch({ type: 'EDIT', payload: null })}
        />
      )}
    </div>
  );
}
