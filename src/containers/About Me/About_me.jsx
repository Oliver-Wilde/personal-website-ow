import React from 'react';
import info from '../../assets/info.png';
import './About_me.css';

const About_me = () => {
  
  return (
    <div id="about" className='ow_about-section-padding' >
      <div className='ow_about-section-content'>
        <h1>
          <img src={info} alt='info' className='info-image' />
          <span className='bigtext-about'>
            About Me!
          </span>
          <br />
          <span className='smalltext-about'>
            Born in Thailand, went to an international school in Saudi Arabia,
            then went to pursue my education in the United Kingdom for High school, college,
            and now university.
          </span>
          <p className='smalltext-about'>
            Currently pursuing my bachelors in software engineering,
            and I’m looking for a year in industry placement.
            I got into coding after finding out that I can edit more than just my grades on my school website using HTML inspect. :)
          </p>
        </h1>

      </div>
    </div>
  )
}

export default About_me;
