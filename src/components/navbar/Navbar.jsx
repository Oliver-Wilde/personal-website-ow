import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './Navbar.css';
import logojpg from '../../assets/logo.jpg';
import gradientImage from '../../assets/gradient.png';
import portfolio from '../../assets/Portfolio_hover.gif';
import skills from '../../assets/skills.gif';
import experience from '../../assets/Experience_hover.gif';
import contact from '../../assets/contact_hover.gif';
import about from '../../assets/About_me.gif';

const Navbar = ({ setHoverGif }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMouseEnter = (gif) => {
    setHoverGif(gif);
  };

  const handleMouseLeave = () => {
    setHoverGif(null);
  };

  return (
    <div className='ow_navbar'>
      <div className='ow_navbar-links'>
        <div className='ow_navbar-links-logo'>
          <img src={logojpg} alt='logo' className='logo-image' />
        </div>
        <div className='ow_navbar-links-container'>
          <p onMouseEnter={() => handleMouseEnter(portfolio)} onMouseLeave={handleMouseLeave}>
            <a href='#portfolio'>.portfolio</a>
          </p>
          <p onMouseEnter={() => handleMouseEnter(about)} onMouseLeave={handleMouseLeave}>
            <a href='#about'>.about</a>
          </p>
          <p onMouseEnter={() => handleMouseEnter(skills)} onMouseLeave={handleMouseLeave}>
            <a href='#skills'>.skills</a>
          </p>
          <p onMouseEnter={() => handleMouseEnter(experience)} onMouseLeave={handleMouseLeave}>
            <a href='#experience'>.experience</a>
          </p>
          <p onMouseEnter={() => handleMouseEnter(contact)} onMouseLeave={handleMouseLeave}>
            <a href='#contact'>.contacts</a>
          </p>
        </div>
        <div className='background'>
          <img src={gradientImage} alt='Gradient' className='gradient-image' />
        </div>
        <div className='ow_navbar-menu'>
          {toggleMenu
            ? <RiCloseLine color='#fff' size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line color='#fff' size={27} onClick={() => setToggleMenu(true)} />}
          {toggleMenu && (
            <div className='ow_navbar-menu-container scale-up-centre '>
              <div className='ow_navbar-menu-container-links scale-up-centre'>
                <p onMouseEnter={() => handleMouseEnter(portfolio)} onMouseLeave={handleMouseLeave}>
                  <a href='#portfolio'>.portfolio</a>
                </p>
                <p onMouseEnter={() => handleMouseEnter(about)} onMouseLeave={handleMouseLeave}>
                  <a href='#about'>.about</a>
                </p>
                <p onMouseEnter={() => handleMouseEnter(skills)} onMouseLeave={handleMouseLeave}>
                  <a href='#skills'>.skills</a>
                </p>
                <p onMouseEnter={() => handleMouseEnter(experience)} onMouseLeave={handleMouseLeave}>
                  <a href='#experience'>.experience</a>
                </p>
                <p onMouseEnter={() => handleMouseEnter(contact)} onMouseLeave={handleMouseLeave}>
                  <a href='#contact'>.contacts</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
