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

const CONTACT_ORDER = [
  'github',
  'email',
  'linkedin',
];

const orderedContactMethods =
  CONTACT_ORDER
    .map((id) => (
      contactMethods.find(
        (method) => method.id === id
      )
    ))
    .filter(Boolean);

const ContactPanel = () => {
  const tooltipRef = useRef(null);
  const animationFrameRef = useRef(null);

  const tooltipPositionRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    initialised: false,
  });

  const [
    activeMethodId,
    setActiveMethodId,
  ] = useState(null);

  const activeMethod =
    contactMethods.find(
      (method) =>
        method.id === activeMethodId
    ) || null;

  useEffect(() => {
    const animate = () => {
      const tooltip = tooltipRef.current;
      const position =
        tooltipPositionRef.current;

      if (tooltip) {
        position.x +=
          (position.targetX - position.x) *
          0.18;

        position.y +=
          (position.targetY - position.y) *
          0.18;

        tooltip.style.setProperty(
          '--contact-tooltip-x',
          `${position.x.toFixed(2)}px`
        );

        tooltip.style.setProperty(
          '--contact-tooltip-y',
          `${position.y.toFixed(2)}px`
        );
      }

      animationFrameRef.current =
        window.requestAnimationFrame(
          animate
        );
    };

    animationFrameRef.current =
      window.requestAnimationFrame(
        animate
      );

    return () => {
      if (
        animationFrameRef.current !== null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, []);

  const positionTooltip = (
    clientX,
    clientY,
    immediate = false
  ) => {
    const position =
      tooltipPositionRef.current;

    const dialogWidth = Math.min(
      320,
      window.innerWidth - 32
    );

    const targetX = Math.max(
      16,
      Math.min(
        clientX + 18,
        window.innerWidth -
          dialogWidth -
          16
      )
    );

    const targetY = Math.max(
      16,
      Math.min(
        clientY + 18,
        window.innerHeight - 90
      )
    );

    position.targetX = targetX;
    position.targetY = targetY;

    if (
      immediate ||
      !position.initialised
    ) {
      position.x = targetX;
      position.y = targetY;
      position.initialised = true;
    }
  };

  const handlePointerEnter = (
    method,
    event
  ) => {
    if (event.pointerType === 'touch') {
      return;
    }

    setActiveMethodId(method.id);

    positionTooltip(
      event.clientX,
      event.clientY,
      true
    );
  };

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    positionTooltip(
      event.clientX,
      event.clientY
    );
  };

  const handlePointerLeave = (event) => {
    if (event.pointerType === 'touch') {
      return;
    }

    setActiveMethodId(null);
  };

  const handleFocus = (
    method,
    event
  ) => {
    const bounds =
      event.currentTarget
        .getBoundingClientRect();

    setActiveMethodId(method.id);

    positionTooltip(
      bounds.left + bounds.width / 2,
      bounds.bottom,
      true
    );
  };

  return (
    <section
      className="workspace-panel contact-panel"
      aria-labelledby="contact-panel-title"
    >
      <header className="workspace-heading contact-heading">
        <p className="workspace-eyebrow">
          05 / Contact
        </p>

        <h1 id="contact-panel-title">
          Get in touch.
        </h1>

        <p className="workspace-lead">
          Email for professional enquiries.
          GitHub for code. LinkedIn for updates.
        </p>
      </header>

      <div
        className="contact-icon-stage"
        aria-label="Contact links"
      >
        <div className="contact-icon-grid">
          {orderedContactMethods.map(
            (method, index) => {
              const Icon =
                ICONS[method.icon];

              return (
                <a
                  className="contact-icon-link"
                  href={method.href}
                  key={method.id}
                  target={
                    method.external
                      ? '_blank'
                      : undefined
                  }
                  rel={
                    method.external
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  aria-label={
                    method.label +
                    ': ' +
                    method.value
                  }
                  onPointerEnter={(
                    event
                  ) => {
                    handlePointerEnter(
                      method,
                      event
                    );
                  }}
                  onPointerMove={
                    handlePointerMove
                  }
                  onPointerLeave={
                    handlePointerLeave
                  }
                  onFocus={(event) => {
                    handleFocus(
                      method,
                      event
                    );
                  }}
                  onBlur={() => {
                    setActiveMethodId(null);
                  }}
                >
                  <span className="contact-icon-index">
                    {String(
                      index + 1
                    ).padStart(2, '0')}
                  </span>

                  <Icon aria-hidden="true" />

                  <span className="contact-visually-hidden">
                    {method.label}
                  </span>
                </a>
              );
            }
          )}
        </div>
      </div>

      <div
        ref={tooltipRef}
        className={[
          'contact-pointer-dialog',
          activeMethod
            ? 'is-visible'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role="status"
        aria-live="polite"
        aria-hidden={!activeMethod}
      >
        <span>
          {activeMethod?.label || ''}
        </span>

        <strong>
          {activeMethod?.value || ''}
        </strong>
      </div>
    </section>
  );
};

export default ContactPanel;
