// import React, { useState, useRef, useEffect } from "react";
// import "./EditorModel.css";

// function EditorModel({ file, onSave, onCancel }) {
//   const [content, setContent] = useState(file.content);
//   const [isModified, setIsModified] = useState(false);
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     textareaRef.current.focus();
//     setContent(file.content);
//   }, [file]);

//   const handleKeyDown = (e) => {
//     if ((e.ctrlKey && e.key === 'Enter') || e.key === ':') {
//       handleSave();
//     }
//     if (e.key === 'Escape') {
//       onCancel();
//     }
//   };

//   const handleSave = () => {
//     if (content.length > 5000) {
//       alert("File size limit exceeded (max 5000 characters)");
//       return;
//     }
//     onSave(content);
//     setIsModified(false);
//   };

//   const handleChange = (e) => {
//     if (!isModified) setIsModified(true);
//     setContent(e.target.value);
//   };

//   return (
//     <div className="modal-overlay" onClick={onCancel}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3>Editing: {file.name}</h3>
//           <div className="file-info">
//             <span>Characters: {content.length}</span>
//             {isModified && <span className="modified-indicator">* MODIFIED</span>}
//           </div>
//         </div>
        
//         <textarea
//           ref={textareaRef}
//           value={content}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           className="editor-textarea"
//           placeholder="Start typing..."
//           spellCheck="false"
//         />
        
//         <div className="modal-buttons">
//           <button 
//             onClick={handleSave}
//             className="save-button"
//             disabled={!isModified}
//           >
//             Save (:wq)
//           </button>
//           <button 
//             onClick={onCancel}
//             className="cancel-button"
//           >
//             Cancel (Esc)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditorModel;

// EditorModel.js
import React, { useState } from "react";
import { CodeMirror } from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import "./EditorModel.css"; // your modal CSS

function EditorModel({ file, onSave, onCancel }) {
  const [content, setContent] = useState(file.content);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className="editor-modal-overlay">
      <div className="editor-modal">
        <h2>Editing {file.name}</h2>
        
        <CodeMirror
          value={content}
          height="300px"
          theme={dracula}
          extensions={[javascript()]}
          onChange={(value) => setContent(value)}
        />

        <div className="editor-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditorModel;