import React, { useState } from 'react';
import './Hero_section.css';
import monitor from '../../assets/monitor.png';
import defaultimage from '../../assets/default.gif';
import ContactFormModal from '../../components/contactform/contactformmodal';

const Hero_section = ({ hoverGif }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='ow_hero-section-padding'>
      <div className='ow_hero-section-content'>
        <h1>
          <span className='small-text'>Hi, I'm</span>
          <br />
          <span className='big-text'>Oliver Wilde</span>
          <br />
          <span className='subheading'>Aspiring Game Engineering Student@NCL University</span>
          <div className='resume_button_container'>
            <button type='button'>Resume</button>
            <button className='contact_button' type='button' onClick={openModal}>Contact</button>
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
      <ContactFormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Hero_section;
