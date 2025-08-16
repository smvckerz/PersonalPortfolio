import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Website from './Website';
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
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/website' element={<Website />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
        // <Home />
      )}
    </div>
  );
}

export default App;
