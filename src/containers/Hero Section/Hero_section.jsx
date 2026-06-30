import React, { useState } from "react";
import "./Hero_section.css";
import monitor from "../../assets/monitor.png";
import MonitorTransition from "../../components/monitortransition/monitortransition";
import ContactFormModal from "../../components/contactform/contactformmodal";
import CellularAutomata from "../../components/cellularAutomata/CellularAutomata";

const Hero_section = (props) => {
  const hoverWord = (props && props.hoverWord) ? props.hoverWord : "";

  const [isZoomed, setIsZoomed] = useState(false);
  const closeModal = () => setIsZoomed(false);

  const [showContactForm, setShowContactForm] = useState(false);
  const openContactForm = () => setShowContactForm(true);
  const closeContactForm = () => setShowContactForm(false);

  // IMPORTANT: keep this as a normal JS string; no template literals
  const rootClass = "ow_hero-section-padding" + (isZoomed ? " blur-background" : "");

  return (
    <div className={rootClass}>
      <div className="ow_hero-section-content">
        <h1>
          <span className="small-text">Hi, I'm</span>
          <br />
          <span className="big-text">Oliver Wilde</span>
          <br />
          <span className="subheading">Aspiring Game Engineering Student @ NCL University</span>

          <div className="resume_button_container">
            <button type="button">
              <a href="/cv.jpg" download style={{ color: "inherit", textDecoration: "none" }}>
                Resume
              </a>
            </button>

            <button className="contact_button" type="button" onClick={openContactForm}>
              Contact
            </button>
          </div>
        </h1>

        <div className="ow_hero-section-monitor-padding">
          <div className="ow_hero-section-monitor">
            <img src={monitor} alt="monitor" className="monitor" />

            {/* Screen area inside the monitor */}
            <div className="hover-content-container" aria-label="monitor-sim">
              <CellularAutomata targetText={hoverWord} />
            </div>
          </div>
        </div>
      </div>

      <MonitorTransition isOpen={isZoomed} onClose={closeModal} />

      {showContactForm && <ContactFormModal onClose={closeContactForm} />}
    </div>
  );
};

export default Hero_section;