import React, { useState } from 'react';
import './Hero_section.css';
import monitor from '../../assets/monitor.png';
import '../../animations/animation.js' // Import the animation file
// import monitorimage from '../../assets/blob1.svg'


const Hero_section = () => {
  return (
    <div className='ow_hero-section-padding'>
      <div className='ow_gpt3_hero-section-content'>
        <h1>
          <span className='small-text'>Hi, I'm</span>
          <br />
          <span className='big-text'> Oliver Wilde</span>
          <br />
          <span className='subheading'> Aspiring Student@NCL University</span>
          <div className='resume_button_container'>
          <button type='button'>Resume</button>
        </div>
        </h1>
        <br />
        
        <div className='ow_hero-section-monitor-padding'>
          <div className='ow_hero-section-monitor'>
            <img src={monitor} alt='monitor' class="monitor-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero_section;
