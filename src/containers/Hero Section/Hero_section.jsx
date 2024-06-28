import React, { useState } from 'react';
import './Hero_section.css';
import monitor from '../../assets/monitor.png';
import defaultimage from '../../assets/default.gif';

const Hero_section = ({ hoverGif }) => {
  return (
    <div className='ow_hero-section-padding'>
      <div className='ow_hero-section-content'>
        <h1>
          <span className='small-text'>Hi, I'm</span>
          <br />
          <span className='big-text'>Oliver Wilde</span>
          <br />
          <span className='subheading'>Aspiring Student@NCL University</span>
          <div className='resume_button_container'>
            <button type='button'>Resume</button>
            <button className='contact_button' type='button'>Contact</button>
          </div>
        </h1>
        <div className='ow_hero-section-monitor-padding'>
          <div className='ow_hero-section-monitor'>
            <img src={monitor} alt='monitor' className='monitor' />
            <div className="hover-content-container">
              <img src={hoverGif || defaultimage} alt="content" className="default-gif" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero_section;
