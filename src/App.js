// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Import page components
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';

function App() {
  const [hoveredNavItem, setHoveredNavItem] = useState('');

  return (
    <Router>
      <div className="App">
        {/* Pass the callback to Navbar */}
        <Navbar onHoverNavItem={setHoveredNavItem} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />

        {/* For testing/demo, show hovered nav item */}
        {hoveredNavItem && (
          <p style={{ textAlign: 'center', color: '#fff', marginTop: '1rem' }}>
            You are hovering over: {hoveredNavItem}
          </p>
        )}
      </div>
    </Router>
  );
}

export default App;
