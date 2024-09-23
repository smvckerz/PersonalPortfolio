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

import { ScrollSmoother } from "gsap/ScrollSmoother";
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';

gsap.registerPlugin(ScrollSmoother);

function App() {
  useEffect(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1, // duration to "catch up"
      effects: true
    })
    // Basic GSAP animation: Fade in the header on load
    gsap.from('.App-header', { opacity: 0, duration: 2, y: -50 });
  }, []);

  return (
    <div id="smooth-wrapper" className="App">
      <div id="smooth-content">
        <header className="App-header">
        <h1>HELLO!</h1>
        <p>This site is animated with GSAP!</p>
      </header>
      </div>
    </div>
  );
}

export default App;
