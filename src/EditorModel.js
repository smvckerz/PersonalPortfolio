<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> e6e142ea1ed63497be499f8bf2d2b0023b4f1b8b
import "./EditorModel.css";

function EditorModel({ file, onSave, onCancel }) {
  const [content, setContent] = useState(file.content);
  const [isModified, setIsModified] = useState(false);
  const textareaRef = useRef(null);

  // Auto-focus and set initial content
  useEffect(() => {
    textareaRef.current.focus();
    setContent(file.content);
  }, [file]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleSave = () => {
    if (content.length > 5000) {
      alert("File size exceeds 5000 character limit!");
      return;
    }
    onSave(content);
    setIsModified(false);
  };

  const handleChange = (e) => {
    if (!isModified) setIsModified(true);
    setContent(e.target.value);
  };

  return (
    <div className="model-overlay" onClick={onCancel}>
      <div className="model-content" onClick={(e) => e.stopPropagation()}>
        <div className="model-header">
          <h3>Editing: {file.name}</h3>
          <div className="file-info">
            <span>Chars: {content.length}</span>
            {isModified && <span className="modified-indicator">MODIFIED</span>}
          </div>
        </div>
        
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="editor-textarea"
          placeholder="Start typing..."
          spellCheck="false"
        />
        
        <div className="model-buttons">
          <button 
            onClick={handleSave}
            className="save-button"
            disabled={!isModified}
          >
            Save (:wq)
          </button>
          <button 
            onClick={onCancel}
            className="cancel-button"
          >
            Cancel (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorModel;