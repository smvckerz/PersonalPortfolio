// import React from 'react';
// import Home from './Home';
// import About from './About';
// import Projects from './Projects';
// import Contact from './Contact';
// import './App.css';  // Add styles in this file
// import Tabs from './Tabs';

// function App() {
//     return (
//         <div className="App">
//           <Tabs>
//             <Home />
//             <About />
//             <Projects />
//             <Contact />
//           </Tabs>
//         </div>
//     );
// }

// export default App;

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';
import About from './About';

function App() {
  useEffect(() => {
    // Basic GSAP animation: Fade in the header on load
    gsap.from('.App-header', { opacity: 0, duration: 2, y: -50 });
  }, []);

  return (
    <div className="App">
      {/* Main Content */}
      <Tabs>
        <About />
      </Tabs>
      <header className="App-header">
        <h1>HELLO!</h1>
      </header>
    </div>
  );
}

export default App;