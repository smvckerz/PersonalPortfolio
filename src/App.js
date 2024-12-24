// // App.js
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Home from './Home';
// import About from './About';
// import Projects from './Projects';
// import Tabs from './Tabs';
// import PreLoader1 from './PreLoader1';

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000); // Example: 2 seconds
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <PreLoader1 />
//       ) : (
//         <Tabs className="App-header">
//           <Home label="Home" />
//           <About label="About" />
//           <Projects label="Projects" />
//         </Tabs>
//       )}
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import Home from './Home';

// function App() {
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
// import PreLoader from "./PreLoader";
import Home from "./Home"; // or your main console component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second "loading time"
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <PreLoader /> : <Home />}
    </>
  );
}

export default App;
