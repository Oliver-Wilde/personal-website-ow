import React, { useState } from 'react';
import {
  FiFileText,
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
  resume: FiFileText,
};

const ContactControl = ({
  method,
  isActive,
  onActivate,
}) => {
  const Icon = ICONS[method.icon];

  const content = (
    <>
      <span className="contact-channel-icon" aria-hidden="true">
        <Icon />
      </span>

      <span className="contact-channel-copy">
        <strong>{method.label}</strong>
        <span>{method.detail}</span>
      </span>

      <span className="contact-channel-index" aria-hidden="true">
        {String(
          contactMethods.findIndex((item) => item.id === method.id) + 1
        ).padStart(2, '0')}
      </span>
    </>
  );

  const sharedProps = {
    className:
      `contact-channel${isActive ? ' is-active' : ''}` +
      `${method.pending ? ' is-pending' : ''}`,
    onMouseEnter: onActivate,
    onFocus: onActivate,
  };

  if (!method.href) {
    return (
      <button
        {...sharedProps}
        type="button"
        aria-pressed={isActive}
        onClick={onActivate}
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

const ContactMonitor = ({
  eyebrow,
  value,
  variant,
}) => (
  <section className={`contact-monitor contact-monitor-${variant}`}>
    <header className="contact-monitor-header">
      <span>{eyebrow}</span>

      <div className="contact-monitor-lights" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </header>

    <div className="contact-monitor-screen">
      <p>{value}</p>
    </div>

    <footer className="contact-monitor-footer">
      <span>OW / CONTACT SYSTEM</span>
      <span>READY</span>
    </footer>
  </section>
);

const ContactPanel = () => {
  const [activeMethodId, setActiveMethodId] = useState(
    contactMethods[0].id
  );

  const activeMethod =
    contactMethods.find((method) => method.id === activeMethodId) ||
    contactMethods[0];

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
          Hover, focus, or tap a channel to update the displays. Open my
          professional profiles or contact me directly by email.
        </p>
      </header>

      <div
        className="contact-console"
        aria-label="Interactive contact console"
      >
        <div
          className="contact-monitor-grid"
          aria-live="polite"
          aria-atomic="true"
        >
          <ContactMonitor
            eyebrow="Channel"
            value={activeMethod.label}
            variant="dark"
          />

          <ContactMonitor
            eyebrow="Destination"
            value={activeMethod.value}
            variant="light"
          />
        </div>

        <div
          className="contact-channel-grid"
          aria-label="Contact methods"
        >
          {contactMethods.map((method) => (
            <ContactControl
              key={method.id}
              method={method}
              isActive={method.id === activeMethod.id}
              onActivate={() => setActiveMethodId(method.id)}
            />
          ))}
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