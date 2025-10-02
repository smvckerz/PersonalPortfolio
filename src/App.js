import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';           // <- the terminal/console
import Website from './Website';     // <- the normal site
import SwirlyLoading from './Loading';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 1000);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className={`fade-wrapper ${fadeOut ? 'fade-out' : ''}`}>
          <SwirlyLoading />
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Homepage is the normal site */}
            <Route path="/" element={<Website />} />

            {/* Terminal moved to /console */}
            <Route path="/console" element={<Home />} />

            {/* Old route aliases/redirects */}
            <Route path="/website" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}
