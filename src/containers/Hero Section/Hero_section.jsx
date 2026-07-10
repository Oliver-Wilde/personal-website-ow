import React from 'react';
import './Hero_section.css';
import monitor from '../../assets/monitor.png';
import CellularAutomata from '../../components/cellularAutomata/CellularAutomata';

const HeroSection = ({ hoverWord = '', setActiveSection }) => {
  const handleViewWork = () => {
    if (typeof setActiveSection !== 'function') {
      return;
    }

    setActiveSection('portfolio');

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const portfolioSection = document.querySelector('.portfolio-section');

        if (portfolioSection) {
          portfolioSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  };

  return (
    <section
      className="ow_hero-section-padding"
      aria-labelledby="hero-title"
    >
      <div className="ow_hero-section-content">
        <div className="ow_hero-section-copy">
          <p className="small-text">Hi, I&apos;m</p>

          <h1 id="hero-title" className="big-text">
            Oliver Wilde
          </h1>

          <p className="subheading">
            Software engineer building reliable systems and technically
            demanding products.
          </p>

          <p className="hero-summary">
            First Class MComp Computer Science graduate focused on backend
            engineering, systems programming, databases, performance, and
            maintainable software.
          </p>

          <div className="resume_button_container">
            <a
              className="hero-cta hero-cta-primary"
              href="/cv.jpg"
              download
            >
              Resume
            </a>

            <button
              className="hero-cta hero-cta-secondary"
              type="button"
              onClick={handleViewWork}
            >
              View work
            </button>
          </div>
        </div>

        <div
          className="ow_hero-section-monitor-padding"
          aria-hidden="true"
        >
          <div className="ow_hero-section-monitor">
            <img
              src={monitor}
              alt=""
              className="monitor"
            />

            <div className="hero-monitor-screen">
              <CellularAutomata targetText={hoverWord} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
