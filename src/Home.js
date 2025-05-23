import React, { useReducer, useState, useEffect, useRef } from 'react';
import EditorModel from './EditorModel';
import './Home.css';
import { fsReducer, initialState, handleCommand } from './commands';

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
    if (out !== null) setLines(prev => [...prev, ...out]);
    else setLines([]);
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