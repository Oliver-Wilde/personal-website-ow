import React from 'react';
import {
  education,
  workExperience,
} from '../../../data/experience';
import './ExperiencePanel.css';

const TagList = ({ items }) => (
  <ul className="experience-tags" aria-label="Highlights">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const EducationEntry = ({ entry }) => (
  <article
    className={`experience-entry experience-entry-${entry.variant || 'default'}`}
  >
    <div className="experience-entry-rail">
      <span>{entry.period}</span>
      <span>{entry.status}</span>
    </div>

    <div className="experience-entry-content">
      <p className="experience-entry-organisation">
        {entry.institution}
      </p>

      <h3>{entry.qualification}</h3>
      <p>{entry.summary}</p>

      <TagList items={entry.highlights} />
    </div>
  </article>
);

const WorkEntry = ({ entry }) => (
  <article className="experience-entry experience-entry-work">
    <div className="experience-entry-rail">
      <span>{entry.period}</span>
      <span>{entry.arrangement}</span>
    </div>

    <div className="experience-entry-content">
      <p className="experience-entry-organisation">
        {entry.organisation}
      </p>

      <h3>{entry.role}</h3>

      <p className="experience-entry-location">
        {entry.location}
      </p>

      <p>{entry.summary}</p>

      <TagList items={entry.highlights} />
    </div>
  </article>
);

const ExperiencePanel = () => (
  <section
    className="workspace-panel experience-panel"
    aria-labelledby="experience-panel-title"
  >
    <header className="workspace-heading">
      <p className="workspace-eyebrow">03 / Experience</p>

      <h1 id="experience-panel-title">
        A technical path shaped by more than code.
      </h1>

      <p className="workspace-lead">
        My background combines a First Class Computer Science degree,
        postgraduate study, customer-facing work, healthcare exposure, practical
        training, and creative interests.
      </p>
    </header>

    <div
      className="experience-snapshot"
      aria-label="Experience summary"
    >
      <article className="experience-snapshot-card experience-snapshot-primary">
        <span>Academic result</span>
        <strong>First Class</strong>
        <p>MComp Computer Science at Newcastle University.</p>
      </article>

      <article className="experience-snapshot-card">
        <span>Next chapter</span>
        <strong>Durham MSc</strong>
        <p>Advanced Computer Science, 2026-2027.</p>
      </article>

      <article className="experience-snapshot-card">
        <span>Beyond university</span>
        <strong>{workExperience.length} roles</strong>
        <p>
          Hospitality, healthcare
          observation, and first-aid training.
        </p>
      </article>
    </div>

    <div className="experience-board">
      <section
        className="experience-group experience-group-education"
        aria-labelledby="education-heading"
      >
        <header className="experience-group-heading">
          <div>
            <p>Education</p>
            <h2 id="education-heading">Academic timeline</h2>
          </div>

          <span>{String(education.length).padStart(2, '0')} entries</span>
        </header>

        <div className="experience-entry-list">
          {education.map((entry) => (
            <EducationEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      <section
        className="experience-group experience-group-work"
        aria-labelledby="work-history-heading"
      >
        <header className="experience-group-heading">
          <div>
            <p>Roles outside university</p>
            <h2 id="work-history-heading">Care, work and training</h2>
          </div>

          <span>
            {String(workExperience.length).padStart(2, '0')} entries
          </span>
        </header>

        <div className="experience-entry-list">
          {workExperience.map((entry) => (
            <WorkEntry key={entry.id} entry={entry} />
          ))}
        </div>

        
      </section>
    </div>
  </section>
);

export default ExperiencePanel;