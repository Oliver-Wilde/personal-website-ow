import React, { useState } from 'react';
import './Hero_section.css';
import monitor from '../../assets/monitor.png';
import '../../animations/animation.js';
import about from '../../assets/About_me.gif';
import defaultimage from '../../assets/default.gif';

const Hero_section = ({ hoverContent }) => {
  
  return (
    <div className='ow_hero-section-padding'>
      <div className='ow_hero-section-content'>
        <h1>
          <span className='small-text'>Hi, I'm</span>
          <br />
          <span className='big-text'> Oliver Wilde</span>
          <br />
          <span className='subheading'> Aspiring Student@NCL University</span>
          <div className='resume_button_container'>
            <button type='button'>Resume</button>
            <button className='contact_button' type='button'>Contact</button>
          </div>
        </h1>
        <div className='ow_hero-section-monitor-padding'>
          <div className='ow_hero-section-monitor'>
          {hoverContent ? (
              <img src={hoverContent} alt='about' className="about-gif" />
            ) : (
              <img src={defaultimage} alt='deafult' className="default" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Hero_section;
