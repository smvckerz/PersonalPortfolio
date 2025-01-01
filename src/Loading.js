// // Loading.js
// import React from "react";
// import "./Loading.css";

// function Loading() {
//   return (
//     <div className="loading-container">
//       <div className="spinner"></div>
//       <p>Loading...</p>
//     </div>
//   );
// }

// export default Loading;

// CreepyLoading.js
import React, { useRef, useEffect } from "react";
import "./CreepyLoading.css";

function CreepyLoading() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let offset = 0;
    let animationFrameId;

    const draw = () => {
      offset += 1;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the "face" circles
      ctx.beginPath();
      for (let i = 0; i < 32; i++) {
        const angle = (i + offset * 0.03) * (Math.PI / 16);
        const x = canvas.width / 2 + Math.cos(angle) * 50;
        const y = canvas.height / 2 + Math.sin(angle) * 50;
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        // Fill each circle in the default color (white, or current fillStyle)
      }
      ctx.fill();
    };

    const run = () => {
      draw();
      animationFrameId = requestAnimationFrame(run);
    };

    run();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="creepy-canvas" />;
}

export default CreepyLoading;
