import React from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import './App.css';  // Add styles in this file
import Tabs from './Tabs'; 
import GearShifter from './GearShifter';

function App() {
    return (
        <div className="App">
          <Tabs>
            <Home />
            <About />
            <Projects />
            <Contact />
          </Tabs>
          <GearShifter>
            
          </GearShifter>
        </div>
    );
}

export default App;