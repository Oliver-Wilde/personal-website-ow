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
        Hi, I&apos;m Ollie.
      </h1>

      <p className="workspace-lead">
        I recently completed a First Class MComp in Computer Science at
        Newcastle University, specialising in Game Engineering, which
        involved a lot of C++. In October of 2026 I will begin an MSc in Advanced
        Computer Science at Durham. I am now looking for a graduate
        software engineering role where I can learn quickly, contribute,
        and build on the foundation I already have.
      </p>
    </header>

    <div className="about-opening-grid">
      <article className="about-manifesto">
        <p className="about-module-label">
          How I think through problems
        </p>

        <blockquote>
          When I do not understand something, I go back to the structure.
        </blockquote>

        <p>
          I tend to be methodical, obsessive, and experimental. I break
          problems down, trace how the pieces fit together, and keep going
          until I understand enough to make a careful change.
        </p>
      </article>

      <article className="about-story">
        <div className="about-story-marker">
          PROFILE / 01
        </div>

        <h2>Some context</h2>

        <p>
          I was born in Thailand, spent seven years at ISG Jubail in
          Saudi Arabia, and then continued school, college, and university
          in the United Kingdom. My family background is Thai, British,
          Irish, and Lao, so I have never felt as though I belong neatly
          to one place. Moving between countries and education systems
          meant learning how unfamiliar environments worked and adapting
          each time.
        </p>

        <p>
          At Newcastle University, I specialised in Game Engineering and
          graduated with First Class Honours. Much of that final stage
          involved C++ and lower-level work. My dissertation was a Vulkan
          voxel engine, which forced me to think carefully about memory,
          resource ownership, rendering, performance, and how complicated
          systems fit together.
        </p>

        <p>
          I am at the beginning of my professional career, so I am not
          pretending to have everything settled. I do have a solid
          technical base, I learn quickly, and I am willing to put the
          work in. Right now, I keep coming back to backend engineering,
          JVM software, databases, systems, and performance.
        </p>
      </article>
    </div>

    <AboutRouteMap stops={journey} />

    <section
      className="about-role-grid"
      aria-label="The parts of my life that shape how I work"
    >
      <article className="about-role-card">
        <p className="about-module-label">
          Technical / 01
        </p>

        <h2>What I enjoy technically</h2>

        <p>
          Most of the technical work I enjoy starts with wanting to know
          what is happening underneath. I like tracing data, resources,
          control flow, and performance until I understand why the system
          behaves the way it does.
        </p>

        <div className="about-role-footer">
          Vulkan / C++ / Java / SQL
        </div>
      </article>

      <article className="about-role-card about-role-card-product">
        <p className="about-module-label">
          STNLY / 02
        </p>

        <h2>Building something real</h2>

        <p>
          STNLY is a storefront I am building around my younger brother
          Stanley&apos;s original artwork. It has pushed me across frontend
          development, Shopify, interaction design, and the less glamorous
          work of keeping a real project organised and usable for someone
          else.
        </p>

        <div className="about-role-footer">
          Next.js / TypeScript / Shopify
        </div>
      </article>

      <article className="about-role-card about-role-card-care">
        <p className="about-module-label">
          Responsibility / 03
        </p>

        <h2>Being dependable outside code</h2>

        <p>
          I help care for my younger brother Stanley, who is autistic and
          has learning difficulties, and I assist with his day-to-day
          administration. It is simply part of my life, but it has made
          reliability practical: showing up, keeping track of details,
          handling responsibilities, and adapting when plans change.
        </p>

        <div className="about-role-footer">
          Care / Administration / Support
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
            How I tend to approach things
          </h2>
        </div>

        <span>04 habits</span>
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
          University, preparing for graduate software engineering roles
          starting in 2027. I want to join a team where I can learn
          quickly, contribute, and become useful.
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
