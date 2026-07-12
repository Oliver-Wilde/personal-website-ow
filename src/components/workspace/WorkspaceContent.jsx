import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './WorkspaceContent.css';
import ExperiencePanel from './panels/ExperiencePanel';
import AboutPanel from './panels/AboutPanel';
import ContactPanel from './panels/ContactPanel';
import projects from '../../data/projects';

const FileIcon = () => (
  <span className="project-file-icon" aria-hidden="true">
    <span />
  </span>
);

const HomePanel = () => (
  <section
    className="workspace-panel home-panel"
    aria-labelledby="home-panel-title"
  >
    <header className="home-hero">
      <div className="workspace-heading workspace-heading-large home-hero-copy">
        <p className="workspace-eyebrow">01 / Home &mdash; Oliver Wilde</p>

        <h1 id="home-panel-title">
          <span className="motion-mask-line">
            <span>Software engineer.</span>
          </span>
          <span className="motion-mask-line">
            <span>Systems, products, and tools.</span>
          </span>
        </h1>

        <p className="workspace-lead">
          First Class MComp Computer Science graduate from Newcastle University.
          Incoming MSc Advanced Computer Science student at Durham University.
        </p>

        <div className="home-hero-actions" aria-label="Primary actions">
          <a className="home-hero-action home-hero-action-primary" href="#work">
            View selected work
            <span aria-hidden="true">&rarr;</span>
          </a>

          <a className="home-hero-action" href="#contact">
            Contact and profiles
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <figure
        className="home-hero-media"
        aria-labelledby="home-hero-media-caption"
      >
        <div className="home-hero-media-toolbar">
          <span>MEDIA SLOT / 01</span>
          <span>RESERVED</span>
        </div>

        <div className="home-hero-media-frame">
          <div className="home-hero-media-message">
            <strong>Project image reserved</strong>
            <span>1600 &times; 1000 recommended</span>
          </div>
        </div>

        <figcaption id="home-hero-media-caption">
          <span>Future project evidence</span>
          <span>Landscape / monochrome</span>
        </figcaption>
      </figure>
    </header>

    <div className="workspace-grid workspace-grid-home">
      <article className="workspace-card home-credential-card">
        <p className="workspace-card-label">Education</p>
        <h2>First Class MComp</h2>
        <p>Computer Science at Newcastle University.</p>
      </article>

      <article className="workspace-card home-credential-card">
        <p className="workspace-card-label">Next</p>
        <h2>Durham MSc</h2>
        <p>Advanced Computer Science, 2026&ndash;2027.</p>
      </article>

      <article className="workspace-card home-credential-card">
        <p className="workspace-card-label">Direction</p>
        <h2>Systems and performance</h2>
        <p>
          Interested in backend systems, JVM software, databases, and
          performance.
        </p>
      </article>

      <article className="workspace-card workspace-card-featured home-launchpad">
        <p className="workspace-card-label">Selected work</p>
        <h2>Three completed project files</h2>
        <p>
          Systems programming, product engineering, simulation, and
          evidence-led technical work.
        </p>

        <div
          className="home-project-links"
          aria-label="Featured projects"
        >
          <a
            className="home-project-link"
            href="#work/voxel-engine"
          >
            <span>Vulkan Voxel Engine</span>
            <span aria-hidden="true">&rarr;</span>
          </a>

          <a
            className="home-project-link"
            href="#work/stnly-storefront"
          >
            <span>STNLY Storefront</span>
            <span aria-hidden="true">&rarr;</span>
          </a>

          <a
            className="home-project-link"
            href="#work/ipd"
          >
            <span>Iterated Prisoner&apos;s Dilemma</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <a className="home-contact-link" href="#contact">
          Contact and profiles
          <span aria-hidden="true">&rarr;</span>
        </a>
      </article>
    </div>
  </section>
);

const ProjectCaseStudy = ({ project, onClose, detailRef }) => (
  <article
    ref={detailRef}
    className="case-study-window"
    tabIndex="-1"
    aria-labelledby={`case-study-${project.id}`}
    onKeyDown={(event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }}
  >
    <div className="case-study-toolbar">
      <span>
        WORK / {project.title.toUpperCase()}
      </span>

      <button
        className="case-study-close"
        type="button"
        onClick={onClose}
      >
        Close file
        <span aria-hidden="true">X</span>
      </button>
    </div>

    <header className="case-study-hero">
      <div>
        <p className="workspace-eyebrow">{project.category}</p>
        <h2 id={`case-study-${project.id}`}>{project.title}</h2>
      </div>

      <p>{project.summary}</p>
    </header>

    <dl className="case-study-meta">
      <div>
        <dt>Status</dt>
        <dd>{project.status}</dd>
      </div>

      <div>
        <dt>Context</dt>
        <dd>{project.period}</dd>
      </div>

      <div>
        <dt>Role</dt>
        <dd>{project.role}</dd>
      </div>

      <div>
        <dt>Technologies</dt>
        <dd>{project.technologies.join(', ')}</dd>
      </div>
    </dl>

    {(project.repositoryUrl || project.liveUrl || project.reportUrl) && (
      <div className="case-study-actions" aria-label="Project links">
        {project.repositoryUrl && (
          <a
            className="case-study-action"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View repository
            <span aria-hidden="true">â†&mdash;</span>
          </a>
        )}

        {project.liveUrl && (
          <a
            className="case-study-action"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View live project
            <span aria-hidden="true">â†&mdash;</span>
          </a>
        )}

        {project.reportUrl && (
          <a
            className="case-study-action"
            href={project.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read report
            <span aria-hidden="true">â†&mdash;</span>
          </a>
        )}
      </div>
    )}
    <div className="case-study-content">
      <section className="case-study-section">
        <p className="workspace-card-label">Problem</p>
        <h3>What needed to be solved</h3>
        <p>{project.problem}</p>
      </section>

      <section className="case-study-section">
        <p className="workspace-card-label">Approach</p>
        <h3>How the work was structured</h3>
        <p>{project.approach}</p>
      </section>

      <section className="case-study-section case-study-section-wide">
        <p className="workspace-card-label">Engineering decisions</p>
        <h3>Important choices</h3>

        <ol className="case-study-decisions">
          {project.decisions.map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ol>
      </section>

      <section className="case-study-section">
        <p className="workspace-card-label">Outcome</p>
        <h3>What the project demonstrates</h3>
        <p>{project.outcome}</p>
      </section>

      <section className="case-study-section">
        <p className="workspace-card-label">Evidence</p>
        <h3>How the claims can be verified</h3>
        <p>{project.evidence}</p>
      </section>
    </div>
  </article>
);

const WorkPanel = ({
  activeProjectId,
  onOpenProject,
  onCloseProject,
}) => {
  const [selectedProject, setSelectedProject] = useState(
    () =>
      projects.find(
        (project) => project.id === activeProjectId
      ) || null
  );
  const detailRef = useRef(null);
  const triggerRefs = useRef({});

  useEffect(() => {
    if (selectedProject && detailRef.current) {
      detailRef.current.focus();
    }
  }, [selectedProject]);

  useEffect(() => {
    const nextProject =
      projects.find(
        (project) => project.id === activeProjectId
      ) || null;

    setSelectedProject(nextProject);
  }, [activeProjectId]);

  const openProject = (project) => {
    setSelectedProject(project);

    if (onOpenProject) {
      onOpenProject(project.id);
    }
  };

  const closeProject = () => {
    const previousProjectId = selectedProject
      ? selectedProject.id
      : null;

    setSelectedProject(null);

    if (onCloseProject) {
      onCloseProject();
    }

    if (previousProjectId) {
      window.requestAnimationFrame(() => {
        const previousTrigger = triggerRefs.current[previousProjectId];

        if (previousTrigger) {
          previousTrigger.focus();
        }
      });
    }
  };

  return (
    <section
      className="workspace-panel work-panel"
      aria-labelledby="work-panel-title"
    >
      <header className="workspace-heading">
        <p className="workspace-eyebrow">02 / Work</p>
        <h1 id="work-panel-title">Project files</h1>
        <p className="workspace-lead">
          Open a file to inspect the problem, role, technical approach,
          engineering decisions, and evidence behind the work.
        </p>
      </header>

      {selectedProject ? (
        <ProjectCaseStudy
          project={selectedProject}
          onClose={closeProject}
          detailRef={detailRef}
        />
      ) : (
        <div className="project-file-grid">
          {projects.filter((project) => !project.hidden).map((project, index) => (
            <button
              key={project.id}
              ref={(element) => {
                triggerRefs.current[project.id] = element;
              }}
              className="project-file"
              type="button"
              aria-label={`Open case study for ${project.title}`}
              onClick={() => openProject(project)}
            >
              <div className="project-file-topline">
                <FileIcon />

                <span className="project-file-status">
                  {project.status}
                </span>
              </div>

              <div className="project-file-body">
                <p className="project-file-index">
                  FILE {String(index + 1).padStart(2, '0')}
                </p>

                <p className="project-file-category">
                  {project.category}
                </p>

                <h2>{project.title}</h2>
                <p>{project.summary}</p>
              </div>

              <span className="project-file-action">
                <span>Open case study</span>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

const SCROLL_REVEAL_SELECTOR = [
  '.home-hero-media',
  '.workspace-grid-home > .workspace-card',
  '.project-file',
  '.case-study-toolbar',
  '.case-study-hero',
  '.case-study-meta > div',
  '.case-study-actions',
  '.case-study-section',
  '.experience-snapshot-card',
  '.experience-group-heading',
  '.experience-entry',
  '.experience-interest',
  '.about-manifesto',
  '.about-story',
  '.about-section-heading',
  '.about-route-list > li',
  '.about-role-card',
  '.about-principles-grid > article',
  '.about-now-status',
  '.about-focus',
  '.about-interest-grid > article',
  '.contact-monitor',
  '.contact-channel',
  '.contact-status-card',
].join(', ');

const useScrollReveal = (
  activeSection,
  activeProjectId,
  isTransitioning
) => {
  useLayoutEffect(() => {
    if (isTransitioning) {
      return undefined;
    }

    const panel = document.querySelector(
      '#workspace-main .workspace-panel'
    );

    if (!panel) {
      return undefined;
    }

    const targets = Array.from(
      panel.querySelectorAll(SCROLL_REVEAL_SELECTOR)
    );

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const canObserve =
      typeof window.IntersectionObserver === 'function';

    targets.forEach((target, index) => {
      const delayMs = (index % 4) * 55;

      target.classList.add('scroll-reveal-target');

      target.style.setProperty(
        '--scroll-reveal-delay',
        `${delayMs}ms`
      );

      target.dataset.scrollRevealDelay = String(delayMs);
    });

    if (prefersReducedMotion || !canObserve) {
      targets.forEach((target) => {
        target.classList.add('is-scroll-revealed');
        target.removeAttribute('inert');
      });

      return undefined;
    }

    targets.forEach((target) => {
      target.setAttribute('inert', '');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target;
          const delayMs = Number(
            target.dataset.scrollRevealDelay || 0
          );

          target.classList.add('is-scroll-revealed');

          window.setTimeout(() => {
            if (target.isConnected) {
              target.removeAttribute('inert');
            }
          }, delayMs + 340);

          observer.unobserve(target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    targets.forEach((target) => {
      observer.observe(target);
    });

    return () => {
      observer.disconnect();

      targets.forEach((target) => {
        target.removeAttribute('inert');
      });
    };
  }, [
    activeSection,
    activeProjectId,
    isTransitioning,
  ]);
};
const PANELS = {
  home: HomePanel,
  work: WorkPanel,
  experience: ExperiencePanel,
  about: AboutPanel,
  contact: ContactPanel,
};

const WorkspaceContent = ({
  activeSection,
  activeProjectId,
  onOpenProject,
  onCloseProject,
  isTransitioning,
}) => {
  useScrollReveal(
    activeSection,
    activeProjectId,
    isTransitioning
  );

  if (activeSection === 'work') {
    return (
      <WorkPanel
        activeProjectId={activeProjectId}
        onOpenProject={onOpenProject}
        onCloseProject={onCloseProject}
      />
    );
  }

  const ActivePanel =
    PANELS[activeSection] || HomePanel;

  return <ActivePanel />;
};

export default WorkspaceContent;