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

// import { ScrollSmoother } from 'gsap/ScrollSmoother';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './App.css';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother);

function App() {
  const smootherRef = useRef(null);

  useEffect(() => {
    // Create ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1, // duration to "catch up"
      effects: true,
    });

    smootherRef.current = smoother;

    // Basic GSAP animation: Fade in the header on load
    gsap.from('.App-header', { opacity: 0, duration: 2, y: -50 });

    // Infinite Scroll logic: Loop the content back to the top when it reaches the bottom
    const infiniteScroll = () => {
      const scrollDistance = smoother.scrollTop();
      const totalScroll = smoother.maxScroll();

      if (scrollDistance >= totalScroll) {
        smoother.scrollTop(1); // Scroll back to the top seamlessly
      }
    };

    // Add infinite scroll to the GSAP ticker (animation loop)
    gsap.ticker.add(infiniteScroll);

    return () => {
      // Cleanup the ticker when the component is unmounted
      gsap.ticker.remove(infiniteScroll);
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="App">
      <div id="smooth-content">
        {/* Main Content */}
        <header className="App-header">
          <h1>HELLO!</h1>
          <p>This site is animated with GSAP!</p>
        </header>
        
        {/* Example additional content */}
        <section className="content-section">
          <p>Scroll down for more content</p>
        </section>
        <section className="content-section">
          <p>More sections for smoother scrolling...</p>
        </section>
        <section className="content-section">
          <p>Keep scrolling!</p>
        </section>

        <section className="content-section">
          <p>Keep scrolling!</p>
        </section>
        
        {/* Duplicate sections for infinite scrolling */}
        <section className="content-section">
          <p>Duplicated section for infinite scroll effect.</p>
        </section>
        <section className="content-section">
          <p>Duplicated section for infinite scroll effect.</p>
        </section>
      </div>
    </div>
  );
}

export default App;
