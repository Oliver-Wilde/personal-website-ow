import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './Navbar.css';
import logojpg from '../../assets/logo.jpg';
import gradientImage from '../../assets/gradient.png';
import portfolio from '../../assets/Portfolio_hover.gif';
import skills from '../../assets/skills.gif';
import experience from '../../assets/Experience_hover.gif';
import contact from '../../assets/contact_hover.gif';
import about from '../../assets/About_me.gif';
import defaultimage from '../../assets/default.gif';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
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
        <div className='ow_navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color='#fff' size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='#fff' size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='ow_navbar-menu-container scale-up-centre '>
            <div className='ow_navbar-menu-container-links scale-up-centre'>
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
          </div>
        )}

      </div>
      </div>
      {/* Conditionally render the default GIF container */}
      {!hoverContent && (
        <div className="hover-content-container">
          <img src={defaultimage} alt="default-image" />
        </div>
      )}
      {/* Render the hoverContent when it's not null */}
      {hoverContent && (
        <div className="hover-content-container">
          {hoverContent}
        </div>
      )}
      
    </div>
  );
};

export default Navbar;
