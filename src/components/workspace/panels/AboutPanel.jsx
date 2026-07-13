import React, { useState } from 'react';
import {
  focusAreas,
  interests,
  journey,
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

        <span>TH / SA / BPL / COL / GAP / NCL / DUR</span>
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

      <article className="about-story">
        <div className="about-story-marker">
          PROFILE / 01
        </div>

        <h2>Some context</h2>

        <p>
          I was born in Thailand, spent seven years at ISG Jubail in
          Saudi Arabia, and then continued school, college, and university
          in the United Kingdom. Moving between countries and education systems
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
          I am early in my professional career,
            with a strong technical foundation and a clear interest
            in building reliable, well engineered software. 
            My work is increasingly focused on backend engineering, 
            JVM technologies, databases, systems design, and performance.

        </p>
      </article>
    </div>

    <AboutRouteMap stops={journey} />

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
