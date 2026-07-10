import React from 'react';
import './WorkspaceContent.css';

const PROJECTS = [
  {
    title: 'Vulkan Voxel Engine',
    category: 'Systems and graphics',
    status: 'Flagship case study',
    summary:
      'A performance-focused voxel renderer exploring resource management, chunk streaming, staging uploads, and Vulkan architecture.',
  },
  {
    title: 'STNLY Storefront',
    category: 'Product engineering',
    status: 'Production project',
    summary:
      'A custom headless commerce experience built around a real artist, production constraints, and maintainable frontend architecture.',
  },
  {
    title: 'Integrated Project',
    category: 'Team engineering',
    status: 'University project',
    summary:
      'Collaborative software development demonstrating scoped ownership, technical decision-making, and delivery within a team.',
  },
  {
    title: 'Financial Ledger',
    category: 'Backend and data integrity',
    status: 'Planned',
    summary:
      'A future Java backend project centred on transactions, idempotency, immutable records, testing, and correctness under failure.',
  },
];

const FileIcon = () => (
  <span className="project-file-icon" aria-hidden="true">
    <span />
  </span>
);

const HomePanel = () => (
  <section className="workspace-panel" aria-labelledby="home-panel-title">
    <header className="workspace-heading workspace-heading-large">
      <p className="workspace-eyebrow">01 / Home</p>

      <h1 id="home-panel-title">
        Software engineering,
        <br />
        made dependable.
      </h1>

      <p className="workspace-lead">
        I am Oliver Wilde, a First Class MComp Computer Science graduate
        building reliable systems and technically demanding products.
      </p>
    </header>

    <div className="workspace-grid workspace-grid-home">
      <article className="workspace-card workspace-card-featured">
        <p className="workspace-card-label">Current direction</p>
        <h2>Backend, systems, and performance</h2>
        <p>
          My work is centred on correctness, maintainability, data,
          performance, and software that can be explained and defended.
        </p>
      </article>

      <article className="workspace-card">
        <p className="workspace-card-label">Education</p>
        <h2>First Class MComp</h2>
        <p>Computer Science at Newcastle University.</p>
      </article>

      <article className="workspace-card">
        <p className="workspace-card-label">Next</p>
        <h2>Durham MSc</h2>
        <p>Advanced Computer Science, 2026–2027.</p>
      </article>

      <article className="workspace-card">
        <p className="workspace-card-label">Selected work</p>
        <h2>Four project files</h2>
        <p>
          Systems, product engineering, collaboration, and backend
          reliability.
        </p>
      </article>
    </div>
  </section>
);

const WorkPanel = () => (
  <section className="workspace-panel" aria-labelledby="work-panel-title">
    <header className="workspace-heading">
      <p className="workspace-eyebrow">02 / Work</p>
      <h1 id="work-panel-title">Project files</h1>
      <p className="workspace-lead">
        Selected work organised around engineering decisions, constraints,
        implementation depth, and results.
      </p>
    </header>

    <div className="project-file-grid">
      {PROJECTS.map((project) => (
        <article className="project-file" key={project.title}>
          <div className="project-file-topline">
            <FileIcon />
            <span className="project-file-status">{project.status}</span>
          </div>

          <div>
            <p className="project-file-category">{project.category}</p>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </div>

          <span className="project-file-action">
            Case study structure coming next
          </span>
        </article>
      ))}
    </div>
  </section>
);

const ExperiencePanel = () => (
  <section
    className="workspace-panel"
    aria-labelledby="experience-panel-title"
  >
    <header className="workspace-heading">
      <p className="workspace-eyebrow">03 / Experience</p>
      <h1 id="experience-panel-title">Education and engineering context</h1>
      <p className="workspace-lead">
        The technical foundation behind the work, presented without
        separating education from practical engineering evidence.
      </p>
    </header>

    <div className="workspace-grid workspace-grid-experience">
      <article className="workspace-card workspace-card-wide">
        <p className="workspace-card-label">2022–2026</p>
        <h2>Newcastle University</h2>
        <p>
          First Class MComp Computer Science, including systems,
          game-engineering work, team development, and a Vulkan-based
          dissertation project.
        </p>
      </article>

      <article className="workspace-card workspace-card-wide">
        <p className="workspace-card-label">2026–2027</p>
        <h2>Durham University</h2>
        <p>
          Incoming MSc Advanced Computer Science student, extending work in
          programming, algorithms, research, systems, and advanced technical
          problem-solving.
        </p>
      </article>

      <article className="workspace-card">
        <p className="workspace-card-label">Engineering focus</p>
        <h2>Reliable software</h2>
        <p>
          Backend architecture, databases, testing, performance, and clear
          technical trade-offs.
        </p>
      </article>

      <article className="workspace-card">
        <p className="workspace-card-label">Working style</p>
        <h2>Evidence over claims</h2>
        <p>
          Projects should show what was built, why decisions were made, how
          the result was validated, and what was learned.
        </p>
      </article>
    </div>
  </section>
);

const AboutPanel = () => (
  <section className="workspace-panel" aria-labelledby="about-panel-title">
    <header className="workspace-heading">
      <p className="workspace-eyebrow">04 / About</p>
      <h1 id="about-panel-title">Engineering with depth and clarity</h1>
    </header>

    <div className="workspace-grid workspace-grid-about">
      <article className="workspace-card workspace-card-featured">
        <p className="workspace-card-label">Profile</p>
        <h2>Oliver Wilde</h2>
        <p>
          I am a software engineer interested in systems that need to remain
          correct, understandable, and maintainable as their complexity
          grows.
        </p>
        <p>
          My strongest work combines lower-level technical depth with
          practical product delivery: graphics and systems work, backend
          design, data integrity, performance investigation, and developer
          tooling.
        </p>
      </article>

      <article className="workspace-card">
        <p className="workspace-card-label">I value</p>
        <h2>Clear ownership</h2>
        <p>
          Specific contributions, defensible decisions, honest limitations,
          and documented outcomes.
        </p>
      </article>

      <article className="workspace-card">
        <p className="workspace-card-label">I am building toward</p>
        <h2>Backend and regulated systems</h2>
        <p>
          Graduate software engineering roles where correctness,
          reliability, and long-term maintainability matter.
        </p>
      </article>
    </div>
  </section>
);

const ContactPanel = () => (
  <section className="workspace-panel" aria-labelledby="contact-panel-title">
    <header className="workspace-heading">
      <p className="workspace-eyebrow">05 / Contact</p>
      <h1 id="contact-panel-title">Start with the work</h1>
      <p className="workspace-lead">
        The final contact details and professional profiles will be connected
        during the content pass. The current résumé remains available below.
      </p>
    </header>

    <div className="workspace-grid workspace-grid-contact">
      <article className="workspace-card workspace-card-featured">
        <p className="workspace-card-label">Résumé</p>
        <h2>Professional overview</h2>
        <p>
          Education, technical work, selected projects, and current
          engineering direction.
        </p>

        <a className="workspace-action" href="/cv.jpg" download>
          Download résumé
          <span aria-hidden="true">↗</span>
        </a>
      </article>

      <article className="workspace-card">
        <p className="workspace-card-label">Contact pass</p>
        <h2>Next connection step</h2>
        <p>
          Email, GitHub, LinkedIn, and final application availability will be
          added only after their exact destinations are confirmed.
        </p>
      </article>
    </div>
  </section>
);

const PANELS = {
  home: HomePanel,
  work: WorkPanel,
  experience: ExperiencePanel,
  about: AboutPanel,
  contact: ContactPanel,
};

const WorkspaceContent = ({ activeSection }) => {
  const ActivePanel = PANELS[activeSection] || HomePanel;

  return <ActivePanel />;
};

export default WorkspaceContent;