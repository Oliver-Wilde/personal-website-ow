import React from 'react';
import './Navbar.css';

const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'experience', label: 'Experience', number: '03' },
  { id: 'about', label: 'About', number: '04' },
  { id: 'contact', label: 'Contact', number: '05' },
];

const Navbar = ({ activeSection, onSelectSection }) => {
  const selectSection = (section) => {
    if (typeof onSelectSection === 'function') {
      onSelectSection(section);
    }
  };

  return (
    <aside className="site-sidebar">
      <div className="sidebar-identity">
        <button
          className="sidebar-logo"
          type="button"
          aria-label="Open home panel"
          onClick={() => selectSection('home')}
        >
          OW
        </button>

        <div className="sidebar-name">
          <strong>Oliver Wilde</strong>
          <span>Software engineer</span>
        </div>
      </div>

      <nav className="sidebar-navigation" aria-label="Primary navigation">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              className={`sidebar-navigation-item${isActive ? ' is-active' : ''}`}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => selectSection(item.id)}
            >
              <span className="sidebar-navigation-number">
                {item.number}
              </span>

              <span>{item.label}</span>

              <span className="sidebar-navigation-arrow" aria-hidden="true">
                →
              </span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-status">
          <span className="sidebar-status-dot" aria-hidden="true" />
          Preparing for 2027 graduate roles
        </p>

        <a
          className="sidebar-resume-link"
          href="/cv.jpg"
          download
        >
          Download résumé
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  );
};

export default Navbar;