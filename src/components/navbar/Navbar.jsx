import React, { useState } from 'react';
import './Navbar.css';
import logojpg from '../../assets/logo.jpg';
import gradientImage from '../../assets/gradient.png';
import portfolio from '../../assets/Portfolio_hover.gif'


const Navbar = () => {
  const [about, setContent] = useState('');
  
  const switch_image = (newContent) => {
    setContent(newContent);
  };



  return (
    <div className='ow_navbar'>

      <div className='ow_navbar-links'>
        <div className='ow_navbar-links-logo'>
          <img src={logojpg} alt='logo' className='logo-image' />
        </div>
        <div className='ow_navbar-links-container'>
          <p onMouseOver={() => switch_image(<img src={portfolio} alt="portfolio" />)}>
            <a href='#portfolio'  >.portfolio</a>
          </p>
          <p onMouseOver={switch_image}>
            <a href='#about'  >.about</a>
            </p>
          <p onMouseOver={switch_image}>
            <a href='#skills'  >.skills</a>
            </p>
          <p onMouseOver={switch_image}>
            <a href='#experience'  >.experience</a>
            </p>
          <p onMouseOver={switch_image}>
            <a href='#contact'  >.contacts</a>
            </p>
        </div>
        <div className='background'>
          <img src={gradientImage} alt='Gradient' className='gradient-image' />

        </div>
      </div>
    </div>
  );
};



export default Navbar