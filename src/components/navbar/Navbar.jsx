import React, {useState} from 'react';

import './Navbar.css';
import logojpg from '../../assets/logo.jpg';
import gradientImage from '../../assets/gradient.png';
const Navbar = () => {
  const handleNavbarHover = () => {
    setIsNavbarHovered(true);
  };
  
  const handleNavbarLeave = () => {
    setIsNavbarHovered(false);
  };

  return (
   <div className='ow_navbar'>
    
    <div className='ow_navbar-links'>
      <div className='ow_navbar-links-logo'>
        <img src={logojpg} alt='logo' className='logo-image' />
      </div>
      <div className='ow_navbar-links-container'>
      <p><a href='#portfolio'  onMouseEnter={handleNavbarHover} onMouseLeave={handleNavbarLeave}>.portfolio</a></p>
      <p><a href='#about'  onMouseEnter={handleNavbarHover} onMouseLeave={handleNavbarLeave}>.about</a></p>
      <p><a href='#skills'  onMouseEnter={handleNavbarHover} onMouseLeave={handleNavbarLeave}>.skills</a></p>
      <p><a href='#experience'  onMouseEnter={handleNavbarHover} onMouseLeave={handleNavbarLeave}>.experience</a></p>
      <p><a href='#contact'  onMouseEnter={handleNavbarHover} onMouseLeave={handleNavbarLeave}>.contacts</a></p>
      </div>
      <div className='background'>
        <img src={gradientImage} alt='Gradient' className='gradient-image' />
      </div>
    </div>
   </div>
);
};
  


export default Navbar