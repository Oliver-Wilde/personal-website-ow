import React from 'react';

import './Navbar.css';
import logojpg from '../../assets/logo.jpg';
import gradientImage from '../../assets/gradient.png';
const Navbar = () => {
  return (
   <div className='ow_navbar'>
    <div className='background'>
        <img src={gradientImage} alt='Gradient' className='gradient-image' />
      </div>
    <div className='ow_navbar-links'>
      <div className='ow_navbar-links-logo'>
        <img src={logojpg} alt='logo' className='logo-image' />
      </div>
      <div className='ow_navbar-links-container'>
      <p><a href='#portfolio'>.portfolio</a></p>
      <p><a href='#about'>.about</a></p>
      <p><a href='#skills'>.skills</a></p>
      <p><a href='#experience'>.experience</a></p>
      <p><a href='#contact'>.contacts</a></p>
      </div>
    </div>
   </div>
);
};
  


export default Navbar