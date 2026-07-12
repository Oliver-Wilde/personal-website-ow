import React from 'react';
import './Navbar.css';

const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'experience', label: 'Experience', number: '03' },
  { id: 'about', label: 'About', number: '04' },
  { id: 'contact', label: 'Contact', number: '05' },
];

const Navbar = ({
  activeSection,
  onSelectSection,
  onPreviewSection,
  onClearPreview,
}) => {
  const selectSection = (section) => {
    if (typeof onSelectSection === 'function') {
      onSelectSection(section);
    }
  };

  const previewSection = (section) => {
    if (typeof onPreviewSection === 'function') {
      onPreviewSection(section);
    }
  };

  const clearPreview = () => {
    if (typeof onClearPreview === 'function') {
      onClearPreview();
    }
  };

  const handleSidebarBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      clearPreview();
    }
  };

  return (
    <aside
      className="site-sidebar"
      onMouseLeave={clearPreview}
      onBlur={handleSidebarBlur}
    >
      <div className="sidebar-identity">
        <button
          className="sidebar-identity-button sidebar-logo"
          type="button"
          aria-label="Open home panel"
          onMouseEnter={() => previewSection('home')}
          onFocus={() => previewSection('home')}
          onClick={() => selectSection('home')}
        >
          LOGO
        </button>

        <button
          className="sidebar-identity-button sidebar-name-button"
          type="button"
          aria-label="Open home panel"
          onMouseEnter={() => previewSection('home')}
          onFocus={() => previewSection('home')}
          onClick={() => selectSection('home')}
        >
          Oliver Wilde
        </button>
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
              onMouseEnter={() => previewSection(item.id)}
              onFocus={() => previewSection(item.id)}
              onClick={() => selectSection(item.id)}
            >
              <span className="sidebar-navigation-number">
                {item.number}
              </span>

              <span className="sidebar-navigation-label">
                {item.label}
              </span>

              <span className="sidebar-navigation-arrow" aria-hidden="true">
                &rarr;
              </span>
            </button>
          );
        })}

        <a
          className="sidebar-navigation-item sidebar-resume-link"
          href={`${process.env.PUBLIC_URL}/cv.jpg`}
          download
          aria-label="Download current resume draft"
          onMouseEnter={() => previewSection('resume')}
          onFocus={() => previewSection('resume')}
        >
          <span className="sidebar-navigation-number">
            06
          </span>

          <span className="sidebar-navigation-label">
            Resume
          </span>

          <span className="sidebar-navigation-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </nav>
    </aside>
  );
};

export default Navbar;