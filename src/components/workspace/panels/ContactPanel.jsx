import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi';
import { contactMethods } from '../../../data/contact';
import './ContactPanel.css';

const ICONS = {
  email: FiMail,
  github: FiGithub,
  linkedin: FiLinkedin,
};

const ContactSignalMonitor = ({
  method,
  index,
  isActive,
  onActivate,
}) => {
  const Icon = ICONS[method.icon];
  const disturbanceTimerRef = useRef(null);
  const [isDisturbed, setIsDisturbed] = useState(false);

  useEffect(() => {
    return () => {
      if (disturbanceTimerRef.current) {
        window.clearTimeout(disturbanceTimerRef.current);
      }
    };
  }, []);

  const triggerDisturbance = () => {
    setIsDisturbed(true);

    if (disturbanceTimerRef.current) {
      window.clearTimeout(disturbanceTimerRef.current);
    }

    disturbanceTimerRef.current = window.setTimeout(() => {
      setIsDisturbed(false);
    }, 260);
  };

  const setSignalOrigin = (element, clientX, clientY) => {
    const bounds = element.getBoundingClientRect();

    if (!bounds.width || !bounds.height) {
      return;
    }

    const x = ((clientX - bounds.left) / bounds.width) * 100;
    const y = ((clientY - bounds.top) / bounds.height) * 100;

    const clampedX = Math.min(100, Math.max(0, x));
    const clampedY = Math.min(100, Math.max(0, y));
    const tilt = ((clampedX - 50) / 50) * 4;

    element.style.setProperty(
      '--signal-x',
      `${clampedX}%`
    );

    element.style.setProperty(
      '--signal-y',
      `${clampedY}%`
    );

    element.style.setProperty(
      '--signal-tilt',
      `${tilt}deg`
    );
  };

  const activate = () => {
    onActivate();
    triggerDisturbance();
  };

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    setSignalOrigin(
      event.currentTarget,
      event.clientX,
      event.clientY
    );

    onActivate();
    triggerDisturbance();
  };

  const handlePointerDown = (event) => {
    setSignalOrigin(
      event.currentTarget,
      event.clientX,
      event.clientY
    );

    activate();
  };

  const handleFocus = (event) => {
    event.currentTarget.style.setProperty(
      '--signal-x',
      '50%'
    );

    event.currentTarget.style.setProperty(
      '--signal-y',
      '50%'
    );

    event.currentTarget.style.setProperty(
      '--signal-tilt',
      '0deg'
    );

    activate();
  };

  const className = [
    'contact-signal-monitor',
    isActive ? 'is-active' : '',
    isDisturbed ? 'is-disturbed' : '',
    method.pending ? 'is-pending' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="contact-signal-body">
        <span className="contact-signal-header">
          <span>
            CHANNEL {String(index + 1).padStart(2, '0')}
          </span>

          <span>{isActive ? 'LOCKED' : 'STANDBY'}</span>
        </span>

        <span className="contact-signal-screen">
          <span className="contact-signal-content">
            <span
              className="contact-signal-icon"
              aria-hidden="true"
            >
              <Icon />
            </span>

            <span className="contact-signal-copy">
              <strong>{method.label}</strong>
              <span>{method.value}</span>
            </span>
          </span>
        </span>

        <span className="contact-signal-footer">
          <span>{method.detail}</span>
          <span>{isActive ? 'SELECTED' : 'OPEN'}</span>
        </span>
      </span>

      <span
        className="contact-signal-neck"
        aria-hidden="true"
      />

      <span
        className="contact-signal-base"
        aria-hidden="true"
      />
    </>
  );

  const sharedProps = {
    className,
    onPointerEnter: activate,
    onPointerMove: handlePointerMove,
    onPointerDown: handlePointerDown,
    onFocus: handleFocus,
  };

  if (!method.href) {
    return (
      <button
        {...sharedProps}
        type="button"
        aria-pressed={isActive}
        onClick={activate}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      {...sharedProps}
      href={method.href}
      download={method.download || undefined}
      target={method.external ? '_blank' : undefined}
      rel={method.external ? 'noopener noreferrer' : undefined}
      aria-label={`${method.label}: ${method.value}`}
    >
      {content}
    </a>
  );
};

const ContactDisplayMonitor = ({
  eyebrow,
  value,
  variant,
  icon: Icon,
  displayType,
}) => (
  <section
    className={[
      'contact-monitor',
      `contact-monitor-${variant}`,
      `contact-monitor-${displayType}`,
    ].join(' ')}
  >
    <div className="contact-monitor-body">
      <header className="contact-monitor-header">
        <span>{eyebrow}</span>

        <div className="contact-monitor-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>

      <div className="contact-monitor-screen">
        <div className="contact-monitor-display">
          {Icon ? (
            <span
              className="contact-monitor-display-icon"
              aria-hidden="true"
            >
              <Icon />
            </span>
          ) : null}

          <p>{value}</p>
        </div>
      </div>

      <footer className="contact-monitor-footer">
        <span>OW / CONTACT SYSTEM</span>
        <span>SIGNAL LOCKED</span>
      </footer>
    </div>

    <div
      className="contact-monitor-neck"
      aria-hidden="true"
    />

    <div
      className="contact-monitor-base"
      aria-hidden="true"
    />
  </section>
);

const ContactPanel = () => {
  const [activeMethodId, setActiveMethodId] = useState(
    contactMethods[0].id
  );

  const activeMethod =
    contactMethods.find(
      (method) => method.id === activeMethodId
    ) || contactMethods[0];

  const ActiveIcon = ICONS[activeMethod.icon];

  return (
    <section
      className="workspace-panel contact-panel"
      aria-labelledby="contact-panel-title"
    >
      <header className="workspace-heading contact-heading">
        <p className="workspace-eyebrow">05 / Contact</p>

        <h1 id="contact-panel-title">
          Feel free to
          <br />
          make contact.
        </h1>

        <p className="workspace-lead">
          Move across a channel screen to disturb its signal. Hover,
          focus, or tap a monitor to select it, then open the profile
          or contact me directly.
        </p>
      </header>

      <div
        className="contact-console"
        aria-label="Five-monitor contact desk"
      >
        <div className="contact-scene">
          <div
            className="contact-scene-wall"
            aria-hidden="true"
          />

          <div
            className="contact-desk-surface"
            aria-hidden="true"
          />

          <div
            className="contact-desk-front"
            aria-hidden="true"
          />

          <div
            className="contact-monitor-grid"
            aria-live="polite"
            aria-atomic="true"
          >
            <ContactDisplayMonitor
              eyebrow="Selected channel"
              value={activeMethod.label}
              variant="dark"
              icon={ActiveIcon}
              displayType="platform"
            />

            <ContactDisplayMonitor
              eyebrow="Username / address"
              value={activeMethod.value}
              variant="light"
              displayType="destination"
            />
          </div>

          <div
            className="contact-channel-grid"
            aria-label="Contact channel monitors"
          >
            {contactMethods.map((method, index) => (
              <ContactSignalMonitor
                key={method.id}
                method={method}
                index={index}
                isActive={method.id === activeMethod.id}
                onActivate={() => {
                  setActiveMethodId(method.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="contact-lower-grid">
        <article className="contact-status-card contact-status-card-dark">
          <p className="contact-module-label">Current status</p>

          <h2>Available for 2027 graduate opportunities.</h2>

          <p>
            Primarily interested in backend, distributed systems, databases,
            Java/JVM engineering, performance, and reliable software.
          </p>
        </article>

        <article className="contact-status-card">
          <p className="contact-module-label">Location</p>

          <h2>Newcastle upon Tyne, United Kingdom.</h2>

          <p>
            Open to suitable opportunities across the UK, with Manchester
            and London among my preferred locations.
          </p>
        </article>

        <article className="contact-status-card">
          <p className="contact-module-label">Next chapter</p>

          <h2>Durham University, 2026-2027.</h2>

          <p>
            Incoming MSc Advanced Computer Science student while preparing
            for graduate software engineering applications.
          </p>
        </article>
      </div>
    </section>
  );
};

export default ContactPanel;
