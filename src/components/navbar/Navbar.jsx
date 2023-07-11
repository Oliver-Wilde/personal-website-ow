import React from 'react';

import './Navbar.css';
import logojpg from '../../assets/logo.jpg';

const Navbar = () => {
  return (
    <nav>
    <div className="logo">
      <img src={logojpg} alt="Logo" />
    </div>
    <ul className="nav-links">
      <li><a href="#portfolio">Portfolio</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
);
};
  


export default Navbar