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
import CreepyLoading from "./Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show the creepy loader for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup if unmounted early
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? <CreepyLoading /> : <Home />}
    </div>
  );
}

export default App;
