import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './Navbar.css';
import logojpg from '../../assets/logo.jpg';
import gradientImage from '../../assets/gradient.png';

const Navbar = ({ setHoverWord, setActiveSection }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMouseEnter = (word) => setHoverWord(word);
  const handleMouseLeave = () => setHoverWord('');

  const handleClick = (section) => {
    setActiveSection(section);
    setToggleMenu(false);
  };

  return (
    <div className='ow_navbar'>
      <div className='ow_navbar-links'>
        <div className='ow_navbar-links-logo'>
          <img src={logojpg} alt='logo' className='logo-image' />
        </div>

        <div className='ow_navbar-links-container'>
          <p
            onMouseEnter={() => handleMouseEnter('portfolio')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick('portfolio')}
          >
            <a href='#portfolio'>.portfolio</a>
          </p>

          <p
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick('about')}
          >
            <a href='#about'>.about</a>
          </p>

          <p
            onMouseEnter={() => handleMouseEnter('skills')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick('skills')}
          >
            <a href='#skills'>.skills</a>
          </p>

          <p
            onMouseEnter={() => handleMouseEnter('experience')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick('experience')}
          >
            <a href='#experience'>.experience</a>
          </p>

          <p
            onMouseEnter={() => handleMouseEnter('contact')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick('contact')}
          >
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
                <p
                  onMouseEnter={() => handleMouseEnter('portfolio')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick('portfolio')}
                >
                  <a href='#portfolio'>.portfolio</a>
                </p>

                <p
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick('about')}
                >
                  <a href='#about'>.about</a>
                </p>

                <p
                  onMouseEnter={() => handleMouseEnter('skills')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick('skills')}
                >
                  <a href='#skills'>.skills</a>
                </p>

                <p
                  onMouseEnter={() => handleMouseEnter('experience')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick('experience')}
                >
                  <a href='#experience'>.experience</a>
                </p>

                <p
                  onMouseEnter={() => handleMouseEnter('contact')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick('contact')}
                >
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
