// // App.js
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Home from "./Home";
// import Loading from "./Loading";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a 2-second loading time
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     // Cleanup if component unmounts before 2s
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="App">
//       {loading ? <Loading /> : <Home />}
//     </div>
//   );
// }

// export default App;

// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home";
import SwirlyLoading from "./Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1) Show loading screen for 5 seconds
    const timer = setTimeout(() => {
      // 2) Trigger fade-out
      setFadeOut(true);

      // 3) After 1 second (the duration of our fade transition), unmount loader
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Match the transition duration in CSS
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        // Wrap the loader in a div that can fade out via CSS
        <div className={`fade-wrapper ${fadeOut ? "fade-out" : ""}`}>
          <SwirlyLoading />
        </div>
      ) : (
        // Once loading is false, show the console
        <Home />
      )}
    </div>
  );
}

export default App;