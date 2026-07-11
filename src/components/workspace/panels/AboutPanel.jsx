import React from 'react';
import {
  focusAreas,
  interests,
  journey,
  principles,
} from '../../../data/about';
import './AboutPanel.css';

const AboutPanel = () => (
  <section
    className="workspace-panel about-panel"
    aria-labelledby="about-panel-title"
  >
    <header className="workspace-heading about-heading">
      <p className="workspace-eyebrow">04 / About</p>

      <h1 id="about-panel-title">
        Engineer by practice.
        <br />
        Builder by instinct.
        <br />
        Evidence over claims.
      </h1>

      <p className="workspace-lead">
        I am Oliver Wilde, a First Class Computer Science graduate building
        toward backend, distributed, and regulated systems work. My route
        into engineering has been international, practical, and shaped by
        responsibilities that exist well beyond a codebase.
      </p>
    </header>

    <div className="about-opening-grid">
      <article className="about-manifesto">
        <p className="about-module-label">
          Personal operating principle
        </p>

        <blockquote>
          I like software that still makes sense when the system becomes
          complicated.
        </blockquote>

        <p>
          That means clear ownership, observable behaviour, testable failure
          modes, maintainable boundaries, and technical decisions I can
          explain without hiding behind buzzwords.
        </p>
      </article>

      <article className="about-story">
        <div className="about-story-marker">
          PROFILE / 01
        </div>

        <h2>A little context</h2>

        <p>
          Born in Thailand, I spent seven years studying at ISG Jubail
          in Saudi Arabia, before the school adopted the International
          Baccalaureate system. I later continued my education in the
          United Kingdom, completing a First Class MComp in Computer
          Science at Newcastle University.
        </p>

        <p>
          At Newcastle University I specialised in Game Engineering and
          completed my MComp Computer Science degree with First Class
          Honours. My final-year project was a Vulkan voxel engine, which
          became the clearest expression of what I enjoy: explicit systems,
          difficult technical constraints, performance investigation, and
          software whose behaviour can be reasoned about.
        </p>

        <p>
          My direction now sits increasingly around backend engineering,
          distributed systems, databases, JVM software, performance, and
          long-lived systems where reliability matters.
        </p>
      </article>
    </div>

    <section
      className="about-route"
      aria-labelledby="about-route-heading"
    >
      <header className="about-section-heading">
        <div>
          <p className="about-module-label">Route</p>
          <h2 id="about-route-heading">
            Three places, one continuous path
          </h2>
        </div>

        <span>TH / SA / UK</span>
      </header>

      <ol className="about-route-list">
        {journey.map((stop) => (
          <li key={stop.code}>
            <span className="about-route-code">
              {stop.code}
            </span>

            <p className="about-route-place">
              {stop.place}
            </p>

            <h3>{stop.title}</h3>
            <p>{stop.description}</p>
          </li>
        ))}
      </ol>
    </section>

    <section
      className="about-role-grid"
      aria-label="The roles that shape my work"
    >
      <article className="about-role-card">
        <p className="about-module-label">
          Engineering / 01
        </p>

        <h2>Systems first</h2>

        <p>
          My strongest technical work begins below the surface: explicit GPU
          resource management, architecture, data flow, performance, failure
          behaviour, transaction boundaries, and the decisions that keep a
          system understandable.
        </p>

        <div className="about-role-footer">
          Vulkan / C++ / Java / SQL
        </div>
      </article>

      <article className="about-role-card about-role-card-product">
        <p className="about-module-label">
          Product / 02
        </p>

        <h2>Real work for a real person</h2>

        <p>
          I am building STNLY, a headless Shopify storefront around my
          younger brother Stanley&apos;s original artwork. It combines
          Next.js, TypeScript, commerce infrastructure, interaction design,
          repository discipline, and the practical reality of shipping
          something another person depends on.
        </p>

        <div className="about-role-footer">
          Next.js / TypeScript / Shopify
        </div>
      </article>

      <article className="about-role-card about-role-card-care">
        <p className="about-module-label">
          Responsibility / 03
        </p>

        <h2>Care is part of the story</h2>

        <p>
          Outside university, I provide ongoing day-to-day care for my
          younger brother Stanley and am formally appointed by the DWP to manage his Universal Credit claim and related administration.
          That involves practical support, household responsibilities,
          travel, administration, advocacy, deadlines, and being consistently
          dependable.
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
          <p className="about-module-label">Working method</p>
          <h2 id="about-principles-heading">
            How I try to operate
          </h2>
        </div>

        <span>04 principles</span>
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
          Incoming MSc Advanced Computer Science student at Durham University,
          preparing for 2027 graduate software engineering roles in the UK.
          My longer-term direction is backend engineering in regulated and
          financial systems.
        </p>
      </div>

      <div className="about-focus">
        <p className="about-module-label">
          Building toward
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
          <p className="about-module-label">Away from the keyboard</p>
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