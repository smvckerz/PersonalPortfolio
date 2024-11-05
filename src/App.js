import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Tabs from './Tabs';

function App() {
  // useEffect(() => {
  //   gsap.from('.App-header', { opacity: 0, duration: 2, y: -50 });
  // }, []);

  return (
    // <div className="App">
     <div>
      {/* <header className="App-header"> */}
      <header>
        <p>Hello!</p>
      </header>
      <Tabs className="App-header">
        <Home label="Home" />
        <About label="About" />
        <Projects label="Projects" />
      </Tabs>
    </div>
  );
}

export default App;
