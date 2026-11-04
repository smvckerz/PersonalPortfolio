import React from 'react';
import './App.css';
import Home from './Home';           // <- the terminal/console
import Website from './Website';     // <- the normal site
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Homepage is the normal site */}
          <Route path="/" element={<Website />} />

          {/* Terminal lives at /console */}
          <Route path="/console" element={<Home />} />

          {/* Old route aliases/redirects */}
          <Route path="/website" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
