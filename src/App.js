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

// import React, { useEffect } from 'react';
// import { gsap } from 'gsap';
// import './App.css';
// import About from './About';
// import Tabs from './Tabs';

// function App() {
//   useEffect(() => {
//     // Basic GSAP animation: Fade in the header on load
//     gsap.from('.App-header', { opacity: 0, duration: 2, y: -50 });
//   }, []);

//   return (
//     <div className="App">
//       <Tabs>
//         <About />
//       </Tabs>
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Tabs from './Tabs';

function App() {
  useEffect(() => {
    gsap.from('.App-header', { opacity: 0, duration: 2, y: -50 });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hell!</p>
      </header>
      <Tabs>
        <Home label="Home" />
        <About label="About" />
        <Projects label="Projects" />
      </Tabs>
    </div>
  );
}

export default App;
