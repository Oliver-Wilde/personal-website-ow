import React, { useState } from 'react';
import './Navbar.css';
import logojpg from '../../assets/logo.jpg';
import gradientImage from '../../assets/gradient.png';
import portfolio from '../../assets/Portfolio_hover.gif';
import skills from '../../assets/skills.gif';
import experience from '../../assets/Experience_hover.gif';
import contact from '../../assets/contact_hover.gif';
import about from '../../assets/About_me.gif'
import Hero_section from '../../containers/Hero Section/Hero_section';

const Navbar = () => {
  const [hoverContent, setHoverContent] = useState(null);

  const switchImage = (newContent) => {
    setHoverContent(newContent);
  };

  const resetContent = () => {
    setHoverContent(null);
  };

  return (
    <div className='ow_navbar'>
      <div className='ow_navbar-links'>
        <div className='ow_navbar-links-logo'>
          <img src={logojpg} alt='logo' className='logo-image' />
        </div>
        <div className='ow_navbar-links-container'>
          <p onMouseEnter={() => switchImage(<img src={portfolio} alt="portfolio" />)} onMouseLeave={resetContent}>
            <a href='#portfolio'>.portfolio</a>
          </p>
          <p onMouseEnter={() => switchImage(<img src={about} alt="about" />)} onMouseLeave={resetContent}>
            <a href='#about'>.about</a>
          </p>
          <p onMouseEnter={() => switchImage(<img src={skills} alt="skills" />)} onMouseLeave={resetContent}>
            <a href='#skills'>.skills</a>
          </p>
          <p onMouseEnter={() => switchImage(<img src={experience} alt="experience" />)} onMouseLeave={resetContent}>
            <a href='#experience'>.experience</a>
          </p>
          <p onMouseEnter={() => switchImage(<img src={contact} alt="contact" />)} onMouseLeave={resetContent}>
            <a href='#contact'>.contacts</a>
          </p>
        </div>
        <div className='background'>
          <img src={gradientImage} alt='Gradient' className='gradient-image' />
        </div>
      </div>
      {hoverContent && (
        <div className="hover-content-container">
          {hoverContent}
        </div>
      )}
    </div>
  );
};

export default Navbar;
