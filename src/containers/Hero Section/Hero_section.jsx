import React, { useState } from 'react';
import './Hero_section.css';
import monitor from '../../assets/monitor.png';
import defaultimage from '../../assets/default.gif';
import MonitorTransition from '../../components/monitortransition/monitortransition';
import ContactFormModal from '../../components/contactform/contactformmodal';

const Hero_section = ({ hoverGif }) => {
  // Zoom state (if still needed)
  const [isZoomed, setIsZoomed] = useState(false);
  const openModal = () => setIsZoomed(true);
  const closeModal = () => setIsZoomed(false);

  // Contact form state
  const [showContactForm, setShowContactForm] = useState(false);
  const openContactForm = () => setShowContactForm(true);
  const closeContactForm = () => setShowContactForm(false);

  return (
    <div className={`ow_hero-section-padding ${isZoomed ? 'blur-background' : ''}`}>
      <div className='ow_hero-section-content'>
        <h1>
          <span className='small-text'>Hi, I'm</span>
          <br />
          <span className='big-text'>Oliver Wilde</span>
          <br />
          <span className='subheading'>Aspiring Game Engineering Student @ NCL University</span>
          <div className='resume_button_container'>

            {/* Resume Download Button */}
            <button type="button">
              <a 
                href="/cv.jpg"  // If resume.pdf is in public folder
                download           // Triggers immediate download
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'none'
                }}
              >
                Resume
              </a>
            </button>

            {/* Contact Form Button */}
            <button
              className='contact_button'
              type='button'
              onClick={openContactForm}
            >
              Contact
            </button>
          </div>
        </h1>

        <div className='ow_hero-section-monitor-padding'>
          <div className='ow_hero-section-monitor'>
            <img src={monitor} alt='monitor' className='monitor' />
            {!isZoomed && (
              <div className="hover-content-container">
                <img 
                  src={hoverGif || defaultimage} 
                  alt="content" 
                  className="default-gif" 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Existing MonitorTransition if you're still using it */}
      <MonitorTransition isOpen={isZoomed} onClose={closeModal} />

      {/* Show ContactFormModal if the user clicks "Contact" */}
      {showContactForm && (
        <ContactFormModal onClose={closeContactForm} />
      )}
    </div>
  );
};

export default Hero_section;
