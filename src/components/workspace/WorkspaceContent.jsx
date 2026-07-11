import React, { useEffect, useRef, useState } from 'react';
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
  <section className="workspace-panel" aria-labelledby="home-panel-title">
    <header className="workspace-heading workspace-heading-large">
      <p className="workspace-eyebrow">01 / Home</p>

      <h1 id="home-panel-title">
        Hello World!
        <br />
        I&apos;m Oliver Wilde.
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
        <p>Advanced Computer Science, 2026-2027.</p>
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
          {projects.map((project, index) => (
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
}) => {
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