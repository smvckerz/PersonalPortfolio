// EditorModal.js
import React, { useState } from "react";
import "./EditorModel.css"; // Style as needed

function EditorModal({ file, onSave, onCancel }) {
  const [content, setContent] = useState(file.content);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editing: {file.name}</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="20"
          cols="80"
        ></textarea>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditorModal;
