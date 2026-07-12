import React, { useState } from 'react';
import {
  focusAreas,
  interests,
  journey,
  principles,
} from '../../../data/about';
import './AboutPanel.css';

const buildRouteSegment = (start, end) => {
  const startX = start.mapX * 10;
  const startY = start.mapY * 5;
  const endX = end.mapX * 10;
  const endY = end.mapY * 5;

  const horizontalDistance = Math.abs(
    endX - startX
  );

  const lift =
    horizontalDistance < 80
      ? 24
      : Math.min(
          105,
          55 + (horizontalDistance * 0.08)
        );

  const controlX = (startX + endX) / 2;

  const controlY = Math.max(
    24,
    Math.min(startY, endY) - lift
  );

  return [
    `M ${startX} ${startY}`,
    `C ${controlX} ${controlY}`,
    `${controlX} ${controlY}`,
    `${endX} ${endY}`,
  ].join(' ');
};

const AboutRouteMap = ({ stops }) => {
  const [activeCode, setActiveCode] =
    useState(() => {
      const finalStop = stops[stops.length - 1];
      return finalStop ? finalStop.code : '';
    });

  const activeStop =
    stops.find((stop) => stop.code === activeCode) ||
    stops[0];

  if (!activeStop) {
    return null;
  }

  const activeIndex = stops.findIndex(
    (stop) => stop.code === activeStop.code
  );

  const routeSegments = stops
    .slice(0, -1)
    .map((stop, index) => ({
      id: `${stop.code}-${stops[index + 1].code}`,
      path: buildRouteSegment(
        stop,
        stops[index + 1]
      ),
    }));

  const selectStop = (code) => {
    setActiveCode(code);
  };

  return (
    <section
      className="about-route"
      aria-labelledby="about-route-heading"
    >
      <header className="about-section-heading">
        <div>
          <p className="about-module-label">Route</p>

          <h2 id="about-route-heading">
            Places that shaped the route
          </h2>
        </div>

        <span>TH / SA / NCL / DUR</span>
      </header>

      <div className="about-route-map">
        <div className="about-route-map-visual">
          <div className="about-route-map-plot">
            <img
              className="about-route-world"
              src={`${process.env.PUBLIC_URL}/world-map-dotted.svg`}
              alt=""
              aria-hidden="true"
            />

            <svg
              className="about-route-overlay"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              focusable="false"
            >
              <g className="about-route-segments">
                {routeSegments.map((segment, index) => (
                  <path
                    className="about-route-segment"
                    d={segment.path}
                    key={segment.id}
                    pathLength="1"
                    style={{
                      '--route-segment-index': index,
                    }}
                  />
                ))}
              </g>
            </svg>

            <div className="about-route-node-layer">
              {stops.map((stop, index) => {
                const isActive =
                  activeStop.code === stop.code;

                return (
                  <button
                    className={[
                      'about-route-node',
                      `about-route-node-${stop.code.toLowerCase()}`,
                      isActive ? 'is-active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    key={stop.code}
                    type="button"
                    aria-label={`Show ${stop.place}`}
                    aria-pressed={isActive}
                    onMouseEnter={() => {
                      selectStop(stop.code);
                    }}
                    onFocus={() => {
                      selectStop(stop.code);
                    }}
                    onClick={() => {
                      selectStop(stop.code);
                    }}
                    style={{
                      '--route-map-x': `${stop.mapX}%`,
                      '--route-map-y': `${stop.mapY}%`,
                      '--route-node-offset-x':
                        `${stop.nodeOffsetX || 0}px`,
                      '--route-node-offset-y':
                        `${stop.nodeOffsetY || 0}px`,
                      '--route-stop-index': index,
                    }}
                  >
                    <span
                      className="about-route-node-dot"
                      aria-hidden="true"
                    />

                    <span className="about-route-node-label">
                      {stop.mapLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <article
          className="about-route-info-panel"
          key={activeStop.code}
          aria-live="polite"
        >
          <div className="about-route-info-topline">
            <span>
              STOP {String(activeIndex + 1).padStart(2, '0')}
              {' / '}
              {String(stops.length).padStart(2, '0')}
            </span>

            <span>{activeStop.period}</span>
          </div>

          <div className="about-route-info-body">
            <p className="about-route-info-place">
              {activeStop.place}
            </p>

            <h3>{activeStop.title}</h3>
            <p>{activeStop.description}</p>
          </div>

          <div
            className="about-route-info-progress"
            aria-hidden="true"
          >
            {stops.map((stop, index) => (
              <span
                className={
                  index <= activeIndex
                    ? 'is-complete'
                    : ''
                }
                key={stop.code}
              />
            ))}
          </div>
        </article>

        <div
          className="about-route-controls"
          aria-label="Journey stops"
        >
          {stops.map((stop, index) => {
            const isActive =
              activeStop.code === stop.code;

            return (
              <button
                className={isActive ? 'is-active' : ''}
                key={stop.code}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => {
                  selectStop(stop.code);
                }}
                onFocus={() => {
                  selectStop(stop.code);
                }}
                onClick={() => {
                  selectStop(stop.code);
                }}
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                  {' / '}
                  {stop.code}
                </span>

                <strong>{stop.place}</strong>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
const AboutPanel = () => (
  <section
    className="workspace-panel about-panel"
    aria-labelledby="about-panel-title"
  >
    <header className="workspace-heading about-heading">
      <p className="workspace-eyebrow">04 / About</p>

      <h1 id="about-panel-title">
        I like learning how systems work,
        <br />
        building useful things,
        <br />
        and getting better at both.
      </h1>

      <p className="workspace-lead">
        I was born in Thailand, spent seven years studying in Jubail,
        and continued my education in the United Kingdom. I completed
        a First Class MComp at Newcastle and will begin an MSc at Durham
        in 2026. I am now looking for a graduate software engineering
        role where I can keep learning and contribute to real systems.
      </p>
    </header>

    <div className="about-opening-grid">
      <article className="about-manifesto">
        <p className="about-module-label">
          How I like to work
        </p>

        <blockquote>
          I prefer software I can reason about.
        </blockquote>

        <p>
          Clear responsibilities, visible behaviour, and decisions I can
          explain. I do not expect to know everything; I want to understand
          the system, ask useful questions, and improve it carefully.
        </p>
      </article>

      <article className="about-story">
        <div className="about-story-marker">
          PROFILE / 01
        </div>

        <h2>A little context</h2>

        <p>
          I was born in Thailand and spent seven years at ISG Jubail in
          Saudi Arabia before continuing school, college, and university
          in the United Kingdom. Moving between different environments
          taught me to adapt quickly and become comfortable learning within
          unfamiliar systems.
        </p>

        <p>
          At Newcastle University I specialised in Game Engineering and
          completed my MComp Computer Science degree with First Class
          Honours. My final-year project was a Vulkan voxel engine, which
          gave me the opportunity to work deeply with explicit resources,
          rendering architecture, performance investigation, and difficult
          technical constraints.
        </p>

        <p>
          I am still deciding exactly where I will specialise. Right now,
          I am most interested in backend engineering, systems, databases,
          performance, and reliable software because they offer difficult
          problems that I can keep learning from.
        </p>
      </article>
    </div>

    <AboutRouteMap stops={journey} />

    <section
      className="about-role-grid"
      aria-label="The roles that shape my work"
    >
      <article className="about-role-card">
        <p className="about-module-label">
          Engineering / 01
        </p>

        <h2>Technical work</h2>

        <p>
          The work I have enjoyed most has involved understanding what
          happens below the visible interface: resource ownership, data
          flow, performance, architecture, failure behaviour, and the
          decisions that keep a system understandable.
        </p>

        <div className="about-role-footer">
          Vulkan / C++ / Java / SQL
        </div>
      </article>

      <article className="about-role-card about-role-card-product">
        <p className="about-module-label">
          Product / 02
        </p>

        <h2>Building for someone else</h2>

        <p>
          I am building STNLY, a headless Shopify storefront around my
          younger brother Stanley&apos;s original artwork. It combines
          Next.js, TypeScript, commerce infrastructure, interaction design,
          repository discipline, and the practical responsibility of
          delivering something another person will use.
        </p>

        <div className="about-role-footer">
          Next.js / TypeScript / Shopify
        </div>
      </article>

      <article className="about-role-card about-role-card-care">
        <p className="about-module-label">
          Responsibility / 03
        </p>

        <h2>Responsibility outside code</h2>

        <p>
          I help provide day-to-day care for my younger brother Stanley
          and handle related benefits administration. That includes
          practical support, travel, household responsibilities, advocacy,
          deadlines, and being consistently dependable.
        </p>

        <div className="about-role-footer">
          Care / Advocacy / Reliability
        </div>
      </article>
    </section>

    <section
      className="about-principles"
      aria-labelledby="about-principles-heading"
    >
      <header className="about-section-heading">
        <div>
          <p className="about-module-label">
            Learning and working
          </p>

          <h2 id="about-principles-heading">
            What I am trying to get better at
          </h2>
        </div>

        <span>04 areas</span>
      </header>

      <div className="about-principles-grid">
        {principles.map((principle) => (
          <article key={principle.number}>
            <span>{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section
      className="about-now"
      aria-labelledby="about-now-heading"
    >
      <div className="about-now-status">
        <p className="about-module-label">
          Current status / 2026
        </p>

        <h2 id="about-now-heading">
          Newcastle complete.
          <br />
          Durham next.
        </h2>

        <p>
          Incoming MSc Advanced Computer Science student at Durham
          University, preparing for 2027 graduate software engineering
          roles in the UK.
        </p>
      </div>

      <div className="about-focus">
        <p className="about-module-label">
          Interested in
        </p>

        <ul>
          {focusAreas.map((focus) => (
            <li key={focus}>{focus}</li>
          ))}
        </ul>
      </div>
    </section>

    <section
      className="about-interests"
      aria-labelledby="about-interests-heading"
    >
      <header className="about-section-heading">
        <div>
          <p className="about-module-label">
            Away from the keyboard
          </p>

          <h2 id="about-interests-heading">
            Other things that keep me interested
          </h2>
        </div>
      </header>

      <div className="about-interest-grid">
        {interests.map((interest) => (
          <article key={interest.number}>
            <span>{interest.number}</span>
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
          </article>
        ))}
      </div>
    </section>
  </section>
);

export default AboutPanel;
