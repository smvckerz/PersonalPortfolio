import React from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import './App.css';  // Add styles in this file
import Tabs from './Tabs';
import ParticlesBackground from './ParticlesBackground';

function App() {
    return (
        <div className="App">
          <ParticlesBackground>
            <Tabs>
              <Home />
              <About />
              <Projects />
              <Contact />
            </Tabs>
          </ParticlesBackground>
        </div>
    );
}

export default App;