// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';

function App() {
  // Track hovered nav text
  const [hoveredText, setHoveredText] = useState("");

  return (
    <Router>
      <div className="App">
        {/* Pass callback to Navbar */}
        <Navbar onHoverNavItem={setHoveredText} />

        <Routes>
          {/* Pass hoveredText into the Home page (or wherever your CA is). */}
          <Route path="/" element={<Home hoveredText={hoveredText} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
