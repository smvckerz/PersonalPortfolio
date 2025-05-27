import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import SwirlyLoading from './Loading';

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='App'>
      {loading ? (
        <div className={`fade-wrapper ${fadeOut ? 'fade-out' : ''}`}>
          <SwirlyLoading />
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
