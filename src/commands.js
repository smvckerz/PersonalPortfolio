// commands.js
// ------------------

const EMAIL = 'edmunoz1030@gmail.com';
const GITHUB = 'https://github.com/smvckerz';
const RESUME = '/Eduardo_Munoz_Resume.pdf';

// Initial filesystem structure
export const initialFileSystem = {
  '': {
    directories: ['projects'],
    files: [
      { name: 'about.txt', content: "Eduardo Munoz - AV Test Expert at NVIDIA. CS grad (SFSU) with a Linux/C systems background, telemetry and log diagnostics." },
      { name: 'contacts.txt', content: `Email: ${EMAIL} | GitHub: github.com/smvckerz` },
      { name: 'resume.pdf', content: 'Run: open resume' },
    ],
  },
  projects: {
    directories: [],
    files: [
      { name: 'av-validation-suite.txt', content: 'Python + SUMO/TraCI harness that runs AV intersection scenarios headlessly and flags hard (collision) and soft (safe-distance) failures.' },
      { name: 'pi-agent.txt', content: 'C++20 observability agent for Raspberry Pi: CPU, memory, load and uptime as JSON over a token-authenticated HTTP API, shipped as a Docker image.' },
      { name: 'pi-infrastructure.txt', content: 'Raspberry Pi infrastructure: Docker, Bash backups, HTTPS rotation, UFW + Fail2Ban. This site runs on it.' },
      { name: 'systems-c.txt', content: 'Unix shell in C, custom file system, pthreads file processor, Linux device driver' },
    ],
  },
};

// Combined initial state
export const initialState = {
  fileSystem: initialFileSystem,
  currentDir: '',
  editingFile: null,
  running: false,
};

// ---- path helpers ---------------------------------------------------------

// Resolve a user-typed path against the current directory.
// Returns a normalized key like '' (root) or 'projects/sub'.
function resolvePath(currentDir, target) {
  const absolute = target.startsWith('/') || target.startsWith('~');
  const start = absolute ? [] : currentDir.split('/').filter(Boolean);
  const rest = target.replace(/^[/~]+/, '').split('/');
  for (const seg of rest) {
    if (!seg || seg === '.') continue;
    if (seg === '..') start.pop();
    else start.push(seg);
  }
  return start.join('/');
}

// Split a path into its parent directory and final name.
function splitPath(currentDir, target) {
  const full = resolvePath(currentDir, target);
  const segs = full.split('/');
  const name = segs.pop();
  return { dir: segs.join('/'), name };
}

function findFile(fileSystem, dir, name) {
  return fileSystem[dir]?.files.find((f) => f.name === name);
}

function displayPath(dir) {
  return '/' + dir;
}

// Reducer for filesystem and UI state
export function fsReducer(state, action) {
  const { fileSystem } = state;
  let newFS;

  switch (action.type) {
    case 'SET_RUNNING':
      return { ...state, running: action.payload };

    case 'MKDIR': {
      const { dir, name } = action.payload;
      newFS = { ...fileSystem };
      newFS[dir] = {
        ...newFS[dir],
        directories: [...newFS[dir].directories, name],
      };
      newFS[dir ? `${dir}/${name}` : name] = { directories: [], files: [] };
      return { ...state, fileSystem: newFS };
    }

    case 'TOUCH': {
      const { dir, name } = action.payload;
      newFS = { ...fileSystem };
      newFS[dir] = {
        ...newFS[dir],
        files: [...newFS[dir].files, { name, content: '' }],
      };
      return { ...state, fileSystem: newFS };
    }

    case 'RM': {
      const { dir, name } = action.payload;
      newFS = { ...fileSystem };
      newFS[dir] = {
        ...newFS[dir],
        files: newFS[dir].files.filter((f) => f.name !== name),
      };
      return { ...state, fileSystem: newFS };
    }

    case 'MV': {
      const { from, to } = action.payload;
      newFS = JSON.parse(JSON.stringify(fileSystem));
      const idx = newFS[from.dir].files.findIndex((f) => f.name === from.name);
      if (idx < 0 || !newFS[to.dir]) return state;
      const [movedFile] = newFS[from.dir].files.splice(idx, 1);
      movedFile.name = to.name;
      newFS[to.dir].files.push(movedFile);
      return { ...state, fileSystem: newFS };
    }

    case 'CD':
      return { ...state, currentDir: action.payload };

    case 'EDIT': {
      if (!action.payload) return { ...state, editingFile: null };
      const { dir, name } = action.payload;
      const fileToEdit = findFile(fileSystem, dir, name);
      return {
        ...state,
        editingFile: fileToEdit ? { ...fileToEdit, path: dir } : null,
      };
    }

    case 'SAVE_EDIT': {
      newFS = { ...fileSystem };
      const { name, path, content } = action.payload;
      newFS[path] = {
        ...newFS[path],
        files: newFS[path].files.map((f) =>
          f.name === name ? { ...f, content } : f
        ),
      };
      return { ...state, fileSystem: newFS, editingFile: null };
    }

    default:
      return state;
  }
}

// ---- static content -------------------------------------------------------

const HELP_LINES = [
  '',
  'Files:',
  '  ls [dir]            list a directory',
  '  cd [dir]            change directory (supports .., /, nested paths)',
  '  pwd                 print the current directory',
  '  tree                show the directory tree',
  '  cat <file>          print a file',
  '  edit <file>         edit a file (creates it if missing)',
  '  touch, mkdir, rm, mv',
  '',
  'About me:',
  '  whoami, skills, experience, projects, contact',
  '  neofetch            system summary',
  '',
  'Other:',
  '  python <file>       run a Python file on the server',
  '  open <target>       resume | github | email | website | <URL>',
  '  echo, date, history, clear (or Ctrl+L)',
  '',
  'Tips: Up/Down for history, Tab to autocomplete.',
  '',
];

const ABOUT = {
  whoami: [
    'Eduardo Munoz',
    'AV Test Expert at NVIDIA | CS grad, SFSU',
    "Type 'experience', 'skills' or 'projects' to learn more.",
  ],
  skills: [
    'Languages        C, C++, Python, Bash',
    'Systems          Linux, POSIX, pthreads, kernel modules, log diagnostics',
    'Validation/data  SUMO / TraCI, telemetry, test planning, MySQL / MariaDB',
    'Infrastructure   Docker, Git / GitHub, TCP/IP, UFW / Fail2Ban',
  ],
  experience: [
    'NVIDIA (via Insight Global)  AV Test Expert, Road Testing   Jul 2026 - Present',
    'Tesla                        AI Safety Operator, FSD         Oct 2025 - Jul 2026',
    "Full details: 'open website'",
  ],
  projects: [
    'av-intersection-validation-suite  Python, SUMO, TraCI',
    'pi-agent                          C++20, CMake, Docker',
    'Self-hosted Pi infrastructure     Bash, Docker, Linux',
    'Unix shell / custom file system / pthreads processor (C)',
    `Code: ${GITHUB}  (try 'open github')`,
  ],
  contact: [`Email:  ${EMAIL}`, `GitHub: ${GITHUB}`, "Resume: 'open resume'"],
  neofetch: [
    'eduardo@portfolio',
    '------------------',
    'Role:   AV Test Expert, NVIDIA',
    'School: SFSU, B.S. Computer Science',
    'Langs:  C, C++, Python, Bash',
    'Host:   Raspberry Pi 5 (this site is self-hosted)',
    'Shell:  react-console',
  ],
};

const OPEN_TARGETS = {
  resume: `${window.location.origin}${RESUME}`,
  github: GITHUB,
  email: `mailto:${EMAIL}`,
};

// ---- tab completion -------------------------------------------------------

const COMMAND_NAMES = [
  'help', 'clear', 'ls', 'cd', 'pwd', 'tree', 'mkdir', 'touch', 'mv', 'edit', 'cat', 'rm',
  'python', 'open', 'echo', 'date', 'history', 'whoami', 'skills', 'experience', 'projects',
  'contact', 'neofetch',
];

// Returns the completed input string, or null if there is nothing to complete.
export function complete(input, state) {
  const { fileSystem, currentDir } = state;
  const parts = input.split(/\s+/);
  const last = parts[parts.length - 1];

  let candidates;
  if (parts.length === 1) {
    candidates = COMMAND_NAMES;
  } else if (parts[0].toLowerCase() === 'open') {
    candidates = [...Object.keys(OPEN_TARGETS), 'website'];
  } else {
    const slash = last.lastIndexOf('/');
    const prefix = slash >= 0 ? last.slice(0, slash + 1) : '';
    const dir = resolvePath(currentDir, prefix || '.');
    const entry = fileSystem[dir];
    if (!entry) return null;
    candidates = [
      ...entry.directories.map((d) => `${prefix}${d}/`),
      ...entry.files.map((f) => `${prefix}${f.name}`),
    ];
  }

  const matches = candidates.filter((c) => c.startsWith(last));
  if (matches.length === 0) return null;
  let common = matches[0];
  for (const m of matches) {
    while (!m.startsWith(common)) common = common.slice(0, -1);
  }
  if (common === last && matches.length > 1) return { matches };
  return { value: [...parts.slice(0, -1), common].join(' ') };
}

// ---- command handler ------------------------------------------------------

function treeLines(fileSystem, dir, indent) {
  const entry = fileSystem[dir];
  const out = [];
  entry.directories.forEach((d) => {
    out.push(`${indent}${d}/`);
    out.push(...treeLines(fileSystem, dir ? `${dir}/${d}` : d, indent + '  '));
  });
  entry.files.forEach((f) => out.push(`${indent}${f.name}`));
  return out;
}

// Command handler. `history` is the list of previously entered commands.
export function handleCommand(command, state, dispatch, executePython, navigate, history = []) {
  const parts = command.trim().split(/\s+/);
  const base = (parts[0] || '').toLowerCase();
  const arg = parts[1] || '';
  const arg2 = parts[2] || '';
  const { fileSystem, currentDir } = state;
  let lines = [];

  switch (base) {
    case '':
      break;

    case 'help':
      lines = HELP_LINES;
      break;

    case 'clear':
      return { lines: null };

    case 'ls': {
      const dir = arg ? resolvePath(currentDir, arg) : currentDir;
      if (fileSystem[dir]) {
        lines = [
          ...fileSystem[dir].directories.map(d => d + '/'),
          ...fileSystem[dir].files.map(f => f.name),
        ];
      } else {
        lines = [`Directory not found: ${arg}`];
      }
      break;
    }

    case 'pwd':
      lines = [displayPath(currentDir)];
      break;

    case 'cd': {
      const dir = resolvePath(currentDir, arg || '/');
      if (fileSystem[dir]) {
        dispatch({ type: 'CD', payload: dir });
      } else if (findFile(fileSystem, splitPath(currentDir, arg).dir, splitPath(currentDir, arg).name)) {
        lines = [`Not a directory: ${arg}`];
      } else {
        lines = [`Directory not found: ${arg}`];
      }
      break;
    }

    case 'tree':
      lines = ['/', ...treeLines(fileSystem, resolvePath(currentDir, arg || '.'), '  ')];
      break;

    case 'mkdir': {
      if (!arg) { lines = ['Usage: mkdir [name]']; break; }
      const { dir, name } = splitPath(currentDir, arg);
      if (!fileSystem[dir]) lines = [`Directory not found: /${dir}`];
      else if (fileSystem[dir].directories.includes(name) || findFile(fileSystem, dir, name)) {
        lines = [`Already exists: ${arg}`];
      } else dispatch({ type: 'MKDIR', payload: { dir, name } });
      break;
    }

    case 'touch': {
      if (!arg) { lines = ['Usage: touch [filename]']; break; }
      const { dir, name } = splitPath(currentDir, arg);
      if (!fileSystem[dir]) lines = [`Directory not found: /${dir}`];
      else if (fileSystem[dir].directories.includes(name)) lines = [`${arg} is a directory`];
      else if (!findFile(fileSystem, dir, name)) dispatch({ type: 'TOUCH', payload: { dir, name } });
      break;
    }

    case 'mv': {
      if (!arg || !arg2) { lines = ['Usage: mv [file] [destination]']; break; }
      const from = splitPath(currentDir, arg);
      if (!findFile(fileSystem, from.dir, from.name)) { lines = [`File not found: ${arg}`]; break; }
      // Destination is either a directory (keep the name) or a new path/name.
      const destDir = resolvePath(currentDir, arg2);
      const to = fileSystem[destDir] ? { dir: destDir, name: from.name } : splitPath(currentDir, arg2);
      if (!fileSystem[to.dir]) lines = [`Directory not found: ${arg2}`];
      else if (findFile(fileSystem, to.dir, to.name)) lines = [`Already exists: ${arg2}`];
      else dispatch({ type: 'MV', payload: { from, to } });
      break;
    }

    case 'edit': {
      if (!arg) { lines = ['Usage: edit [filename]']; break; }
      const { dir, name } = splitPath(currentDir, arg);
      if (!fileSystem[dir]) { lines = [`Directory not found: /${dir}`]; break; }
      if (!findFile(fileSystem, dir, name)) {
        dispatch({ type: 'TOUCH', payload: { dir, name } });
      }
      dispatch({ type: 'EDIT', payload: { dir, name } });
      break;
    }

    case 'cat': {
      if (!arg) { lines = ['Usage: cat [filename]']; break; }
      const { dir, name } = splitPath(currentDir, arg);
      const file = findFile(fileSystem, dir, name);
      lines = file ? [file.content] : [`File not found: ${arg}`];
      break;
    }

    case 'rm': {
      if (!arg) { lines = ['Usage: rm [filename]']; break; }
      const { dir, name } = splitPath(currentDir, arg);
      if (!findFile(fileSystem, dir, name)) lines = [`File not found: ${arg}`];
      else dispatch({ type: 'RM', payload: { dir, name } });
      break;
    }

    case 'python': {
      if (!arg) { lines = ['Usage: python [filename]']; break; }
      const { dir, name } = splitPath(currentDir, arg);
      const file = findFile(fileSystem, dir, name);
      if (!file) {
        lines = [`File not found: ${arg}`];
      } else {
        executePython(file.content);
        lines = [`Executing ${arg}...`];
      }
      break;
    }

    case 'echo':
      lines = [parts.slice(1).join(' ')];
      break;

    case 'date':
      lines = [new Date().toString()];
      break;

    case 'history':
      lines = history.map((h, i) => `${String(i + 1).padStart(3)}  ${h}`);
      break;

    case 'whoami':
    case 'skills':
    case 'experience':
    case 'projects':
    case 'contact':
    case 'neofetch':
      lines = ABOUT[base];
      break;

    case 'open': {
      if (!arg) { lines = ['Usage: open [resume|github|email|website|URL]']; break; }
      const target = arg.toLowerCase();

      if (target === 'website') {
        lines = ['Opening website...'];
        if (typeof navigate === 'function') {
          navigate('/');            // same tab
          return { lines: [] };
        }
        // Fallback: open new tab if navigate not provided
        window.open(`${window.location.origin}/`, '_blank', 'noopener,noreferrer');
        break;
      }

      if (OPEN_TARGETS[target]) {
        lines = [`Opening ${target}...`];
        window.open(OPEN_TARGETS[target], '_blank', 'noopener,noreferrer');
        break;
      }

      if (/^https?:\/\//i.test(arg)) {
        lines = [`Opening ${arg}...`];
        window.open(arg, '_blank', 'noopener,noreferrer');
        break;
      }

      lines = [`Unknown target: ${arg}`];
      break;
    }

    default:
      lines = [`Command not found: ${command}. Type 'help' for a list of commands.`];
  }

  return { lines };
}
