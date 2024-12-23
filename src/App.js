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

import React from "react";
import Console from "./components/Console";

function App() {
  return (
    <div>
      <Console />
    </div>
  );
}

export default App;
