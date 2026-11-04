import React, { useReducer, useState, useEffect, useRef } from 'react';
import EditorModel from './EditorModel';
import './Home.css';
import { fsReducer, initialState, handleCommand, complete } from './commands';
import { useNavigate } from 'react-router-dom';

function getDisplayPath(dir) {
  const parts = dir.split('/').filter(p => p);
  return ['root', ...parts].join('\\');
}

export default function Home() {
  const navigate = useNavigate();  // <- keep only this one (top-level)
  const [state, dispatch] = useReducer(fsReducer, initialState);
  const { currentDir, editingFile, running } = state;

  const [lines, setLines] = useState([
    'Welcome to my Console!',
    "Type 'help' to see available commands, or 'neofetch' for a quick intro.",
    "To use the normal website, type: open website",
  ]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(null);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  const promptText = `C:\\${getDisplayPath(currentDir)} > `;

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  // Input is disabled while Python runs and when the editor is open; take focus back after.
  useEffect(() => {
    if (!running && !editingFile && inputRef.current) inputRef.current.focus();
  }, [running, editingFile]);

  const executePython = (code) => {
    dispatch({ type: 'SET_RUNNING', payload: true });
    fetch(`${process.env.REACT_APP_API_URL || '/api'}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => {
        const out = [data.output, data.error].filter(Boolean).map(s => s.replace(/\n$/, ''));
        setLines(prev => [...prev, ...(out.length ? out : ['(no output)'])]);
      })
      .catch(err => setLines(prev => [...prev, `Error: ${err.message}`]))
      .finally(() => dispatch({ type: 'SET_RUNNING', payload: false }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    setLines(prev => [...prev, `${promptText}${cmd}`]);

    if (cmd) setHistory(prev => (prev[prev.length - 1] === cmd ? prev : [...prev, cmd]));
    setHistoryIdx(null);

    // pass navigate into the command handler
    const { lines: out } = handleCommand(cmd, state, dispatch, executePython, navigate, history);
    if (out === null) setLines([]);
    else setLines(prev => [...prev, ...out]);
    setInputValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInputValue(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === null) return;
      if (historyIdx >= history.length - 1) {
        setHistoryIdx(null);
        setInputValue('');
      } else {
        setHistoryIdx(historyIdx + 1);
        setInputValue(history[historyIdx + 1]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const result = complete(inputValue, state);
      if (!result) return;
      if (result.matches) setLines(prev => [...prev, `${promptText}${inputValue}`, result.matches.join('  ')]);
      else setInputValue(result.value);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className='console-container' onClick={() => !editingFile && !window.getSelection().toString() && inputRef.current?.focus()}>
      <div className='output-lines' ref={outputRef} role='log'>
        {lines.map((l, i) => <div key={i} className='line'>{l}</div>)}
      </div>
      <form onSubmit={onSubmit} className='prompt'>
        <span className='prompt-label'>{promptText}</span>
        <input
          ref={inputRef}
          className='prompt-input'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={running}
          autoFocus
          autoComplete='off'
          autoCapitalize='off'
          spellCheck={false}
          aria-label='Console input'
        />
      </form>
      {editingFile && (
        <EditorModel
          file={editingFile}
          onSave={content => dispatch({ type: 'SAVE_EDIT', payload: { ...editingFile, content } })}
          onCancel={() => dispatch({ type: 'EDIT', payload: null })}
        />
      )}
    </div>
  );
}
