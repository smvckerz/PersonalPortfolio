// commands.js
// ------------------

// Initial filesystem structure
export const initialFileSystem = {
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
  };
  
  // Combined initial state
  export const initialState = {
    fileSystem: initialFileSystem,
    currentDir: "",
    editingFile: null,
    running: false
  };
  
  // Reducer for filesystem and UI state
  export function fsReducer(state, action) {
    const { fileSystem, currentDir } = state;
    let newFS;
  
    switch (action.type) {
      case 'SET_RUNNING':
        return { ...state, running: action.payload };
  
      case 'MKDIR':
        newFS = { ...fileSystem };
        const dirname = action.payload;
        newFS[currentDir] = {
          ...newFS[currentDir],
          directories: [...newFS[currentDir].directories, dirname]
        };
        const newPath = currentDir ? `${currentDir}/${dirname}` : dirname;
        newFS[newPath] = { directories: [], files: [] };
        return { ...state, fileSystem: newFS };
  
      case 'TOUCH':
        newFS = { ...fileSystem };
        newFS[currentDir] = {
          ...newFS[currentDir],
          files: [...newFS[currentDir].files, { name: action.payload, content: '' }]
        };
        return { ...state, fileSystem: newFS };
  
      case 'RM':
        newFS = { ...fileSystem };
        newFS[currentDir] = {
          ...newFS[currentDir],
          files: newFS[currentDir].files.filter(f => f.name !== action.payload)
        };
        return { ...state, fileSystem: newFS };
  
      case 'MV': {
        const { file, dest } = action.payload;
        newFS = JSON.parse(JSON.stringify(fileSystem));
        const idx = newFS[currentDir].files.findIndex(f => f.name === file);
        if (idx < 0 || !newFS[dest]) return state;
        const [movedFile] = newFS[currentDir].files.splice(idx, 1);
        newFS[dest].files.push(movedFile);
        return { ...state, fileSystem: newFS };
      }
  
      case 'CD':
        return { ...state, currentDir: action.payload };
  
      case 'EDIT':
        const fileToEdit = fileSystem[currentDir]?.files.find(f => f.name === action.payload);
        return { ...state, editingFile: fileToEdit ? { ...fileToEdit, path: currentDir } : null };
  
      case 'SAVE_EDIT':
        newFS = { ...fileSystem };
        const { name, path, content } = action.payload;
        newFS[path] = {
          ...newFS[path],
          files: newFS[path].files.map(f =>
            f.name === name ? { ...f, content } : f
          )
        };
        return { ...state, fileSystem: newFS, editingFile: null };
  
      default:
        return state;
    }
  }
  
  // Command handler
  export function handleCommand(command, state, dispatch, executePython) {
    const parts = command.trim().split(/\s+/);
    const base = parts[0].toLowerCase();
    const arg = parts[1] || '';
    const arg2 = parts[2] || '';
    const { fileSystem, currentDir } = state;
    let lines = [];
  
    switch (base) {
      case 'help':
        lines = [
          '',
          'Available commands:',
          '  help, clear, ls, cd, mkdir, touch, mv, edit, cat, rm, python',
          ''
        ];
        break;
  
      case 'clear':
        return { lines: null };
  
      case 'ls':
        if (fileSystem[currentDir]) {
          lines = [
            ...fileSystem[currentDir].directories.map(d => d + '/'),
            ...fileSystem[currentDir].files.map(f => f.name)
          ];
        } else {
          lines = [`Directory not found: ${currentDir}`];
        }
        break;
  
      case 'cd':
        if (!arg) {
          lines = ['Usage: cd [directory]'];
        } else if (arg === '..') {
          const parts = currentDir.split('/').filter(p => p);
          parts.pop();
          dispatch({ type: 'CD', payload: parts.join('/') });
          lines = ['Moved to parent directory'];
        } else if (fileSystem[currentDir]?.directories.includes(arg)) {
          const newDir = currentDir ? `${currentDir}/${arg}` : arg;
          dispatch({ type: 'CD', payload: newDir });
          lines = [`Changed directory to ${arg}`];
        } else {
          lines = [`Directory not found: ${arg}`];
        }
        break;
  
      case 'mkdir':
        if (!arg) lines = ['Usage: mkdir [name]']; else dispatch({ type: 'MKDIR', payload: arg });
        break;
  
      case 'touch':
        if (!arg) lines = ['Usage: touch [filename]']; else dispatch({ type: 'TOUCH', payload: arg });
        break;
  
      case 'mv':
        if (!arg || !arg2) lines = ['Usage: mv [file] [destination]']; else dispatch({ type: 'MV', payload: { file: arg, dest: arg2 } });
        break;
  
      case 'edit':
        if (!arg) lines = ['Usage: edit [filename]']; else dispatch({ type: 'EDIT', payload: arg });
        break;
  
      case 'cat': {
        const file = fileSystem[currentDir]?.files.find(f => f.name === arg);
        lines = file ? [file.content] : [`File not found: ${arg}`];
        break;
      }
  
      case 'rm':
        if (!arg) lines = ['Usage: rm [filename]']; else dispatch({ type: 'RM', payload: arg });
        break;
  
      case 'python': {
        const file = fileSystem[currentDir]?.files.find(f => f.name === arg);
        if (!file) {
          lines = [`File not found: ${arg}`];
        } else {
          executePython(file.content);
          lines = [`Executing ${arg}...`];
        }
        break;
      }
  
      default:
        lines = command ? [`Command not found: ${command}`] : [];
    }
  
    return { lines };
  }