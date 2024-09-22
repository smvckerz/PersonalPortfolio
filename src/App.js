import React from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import './App.css';  // Add styles in this file
import Tabs from './Tabs';

function App() {
    return (
        <div className="App">
          <Tabs>
            <Home />
            <About />
            <Projects />
            <Contact />
          </Tabs>
        </div>
    );
}

export default App;