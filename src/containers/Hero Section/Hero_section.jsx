import React, { useState } from 'react';
import './Hero_section.css';
import monitor from '../../assets/monitor.png';
import '../../animations/animation.js' // Import the animation file
// import monitorimage from '../../assets/blob1.svg'
import about from '../../assets/About_me.gif'

const Hero_section = () => {
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
            {/* <img src={monitor} alt='monitor' class="monitor-image" /> */}
            <img src={about} alt='about' class="about-gif"/>
          </div>
        </div>
      </div>
    </div>
  );
};

// scripts.js
const imageContainer = document.querySelector('.ow_hero-section-monitor');
const image = imageContainer.querySelector('img');

const links = document.querySelectorAll('ow_navbar-links-container a');

links.forEach(link => {
  link.addEventListener('mouseover', () => {
    const newImagePath = getNewImagePath(link.textContent);
    if (newImagePath) {
      image.src = newImagePath;
    }
  });

  link.addEventListener('mouseout', () => {
    // Change the image back to the default image on mouseout
    image.src = 'C:/Users/james/personal-website-ow/src/assets/About_me.gif';
  });
});

function getNewImagePath(linkText) {
  // Implement your logic to determine the new image path based on the link text
  // For example, you can use a switch statement or an object with link-text-to-image-path mappings
  switch (linkText) {
    case '.portfolio':
      return 'C:/Users/james/personal-website-ow/src/assets/Portfolio_hover.gif';
    case '.about':
      return 'path-to-about-image.jpg';
    case '.skills':
      return 'path-to-services-image.jpg';
    case '.experience':
      return 'path-to-services-image.jpg';  
    case '.contacts':
      return 'path-to-services-image.jpg';
    // Add more cases for additional links
    default:
      return null;
  }
}

export default Hero_section;
