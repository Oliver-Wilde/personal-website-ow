import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './Navbar.css';
import logojpg from '../../assets/logo.jpg';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className='ow_navbar'>
      <div className='ow_navbar-links'>
        <div className='ow_navbar-links-logo'>
          <img src={logojpg} alt='logo' className='logo-image' />
        </div>
        <div className='ow_navbar-links-container'>
          <p>
            <a href='#portfolio'>.portfolio</a>
          </p>
          <p>
            <a href='#about'>.about</a>
          </p>
          <p>
            <a href='#skills'>.skills</a>
          </p>
          <p>
            <a href='#experience'>.experience</a>
          </p>
          <p>
            <a href='#contact'>.contacts</a>
          </p>
        </div>
        <div className='ow_navbar-menu'>
          {toggleMenu
            ? <RiCloseLine color='#fff' size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line color='#fff' size={27} onClick={() => setToggleMenu(true)} />
          }
          {toggleMenu && (
            <div className='ow_navbar-menu-container scale-up-centre '>
              <div className='ow_navbar-menu-container-links scale-up-centre'>
                <p>
                  <a href='#portfolio'>.portfolio</a>
                </p>
                <p>
                  <a href='#about'>.about</a>
                </p>
                <p>
                  <a href='#skills'>.skills</a>
                </p>
                <p>
                  <a href='#experience'>.experience</a>
                </p>
                <p>
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
