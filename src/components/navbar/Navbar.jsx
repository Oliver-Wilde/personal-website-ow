import React, { useEffect, useState } from 'react';
import './Navbar.css';

const renderAsciiEarth = (rotation) => {
  const width = 15;
  const height = 9;
  const centreX = (width - 1) / 2;
  const centreY = (height - 1) / 2;
  const rows = [];

  for (let y = 0; y < height; y += 1) {
    const normalisedY =
      (y - centreY) / centreY;

    let row = '';

    for (let x = 0; x < width; x += 1) {
      const normalisedX =
        (x - centreX) / centreX;

      const radiusSquared =
        (normalisedX * normalisedX) +
        (normalisedY * normalisedY);

      if (radiusSquared > 1) {
        row += ' ';
        continue;
      }

      const depth = Math.sqrt(
        Math.max(0, 1 - radiusSquared)
      );

      const longitude =
        Math.atan2(normalisedX, depth) +
        rotation;

      const latitude = Math.asin(
        Math.max(
          -1,
          Math.min(1, normalisedY)
        )
      );

      const landSignal =
        Math.sin(
          (longitude * 2.1) +
          (Math.cos(latitude * 3) * 0.8)
        ) +
        (
          0.58 *
          Math.cos(
            (longitude * 4.7) -
            (latitude * 2.2)
          )
        ) +
        (
          0.32 *
          Math.sin(
            (longitude * 7.1) +
            (latitude * 5.1)
          )
        );

      const distanceFromEdge =
        1 - radiusSquared;

      if (distanceFromEdge < 0.16) {
        row += '.';
      } else if (landSignal > 0.78) {
        row += '#';
      } else if (landSignal > 0.34) {
        row += '+';
      } else if (
        landSignal > 0.08 &&
        depth < 0.72
      ) {
        row += ':';
      } else {
        row += ' ';
      }
    }

    rows.push(row.replace(/\s+$/, ''));
  }

  return rows.join('\n');
};

const AsciiEarthLogo = () => {
  const [frame, setFrame] = useState(0);
  const [motionAllowed, setMotionAllowed] =
    useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updateMotionPreference = () => {
      setMotionAllowed(!motionQuery.matches);
    };

    updateMotionPreference();

    if (
      typeof motionQuery.addEventListener ===
      'function'
    ) {
      motionQuery.addEventListener(
        'change',
        updateMotionPreference
      );

      return () => {
        motionQuery.removeEventListener(
          'change',
          updateMotionPreference
        );
      };
    }

    motionQuery.addListener(
      updateMotionPreference
    );

    return () => {
      motionQuery.removeListener(
        updateMotionPreference
      );
    };
  }, []);

  useEffect(() => {
    if (!motionAllowed) {
      setFrame(0);
      return undefined;
    }

    const intervalId = window.setInterval(
      () => {
        setFrame(
          (currentFrame) =>
            (currentFrame + 1) % 35
        );
      },
      140
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [motionAllowed]);

  return (
    <pre
      className="sidebar-ascii-earth"
      aria-hidden="true"
    >
      {renderAsciiEarth(frame * 0.18)}
    </pre>
  );
};

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
          <AsciiEarthLogo />
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