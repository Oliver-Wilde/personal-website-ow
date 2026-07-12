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

const renderAsciiDonut = (angleA, angleB) => {
  const width = 42;
  const height = 20;
  const buffer = Array(width * height).fill(' ');
  const depthBuffer = Array(width * height).fill(0);
  const characters = '.,-~:;=!*#$@';

  const sinA = Math.sin(angleA);
  const cosA = Math.cos(angleA);
  const sinB = Math.sin(angleB);
  const cosB = Math.cos(angleB);

  for (
    let theta = 0;
    theta < Math.PI * 2;
    theta += 0.07
  ) {
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    for (
      let phi = 0;
      phi < Math.PI * 2;
      phi += 0.02
    ) {
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      const circleX = 2 + cosTheta;
      const circleY = sinTheta;

      const x =
        circleX *
          (
            cosB * cosPhi +
            sinA * sinB * sinPhi
          ) -
        circleY * cosA * sinB;

      const y =
        circleX *
          (
            sinB * cosPhi -
            sinA * cosB * sinPhi
          ) +
        circleY * cosA * cosB;

      const z =
        5 +
        cosA * circleX * sinPhi +
        circleY * sinA;

      const inverseZ = 1 / z;

      const projectedX = Math.floor(
        (width / 2) +
        (29 * inverseZ * x)
      );

      const projectedY = Math.floor(
        (height / 2) -
        (14 * inverseZ * y)
      );

      const luminance =
        cosPhi * cosTheta * sinB -
        cosA * cosTheta * sinPhi -
        sinA * sinTheta +
        cosB *
          (
            cosA * sinTheta -
            cosTheta * sinA * sinPhi
          );

      if (
        luminance <= 0 ||
        projectedX < 0 ||
        projectedX >= width ||
        projectedY < 0 ||
        projectedY >= height
      ) {
        continue;
      }

      const bufferIndex =
        projectedX +
        (width * projectedY);

      if (inverseZ <= depthBuffer[bufferIndex]) {
        continue;
      }

      depthBuffer[bufferIndex] = inverseZ;

      const characterIndex = Math.min(
        characters.length - 1,
        Math.floor(luminance * 8)
      );

      buffer[bufferIndex] =
        characters[characterIndex];
    }
  }

  return Array.from(
    { length: height },
    (_, rowIndex) => {
      const rowStart = rowIndex * width;

      return buffer
        .slice(rowStart, rowStart + width)
        .join('')
        .replace(/\s+$/, '');
    }
  ).join('\n');
};

const AsciiDonut = () => {
  const staticAngleA = 1;
  const staticAngleB = 0.45;

  const [frame, setFrame] = useState(
    () => renderAsciiDonut(
      staticAngleA,
      staticAngleB
    )
  );

  const [motionAllowed, setMotionAllowed] =
    useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updateMotionPreference = () => {
      setMotionAllowed(!motionQuery.matches);
    };

    updateMotionPreference();

    if (
      typeof motionQuery.addEventListener ===
      'function'
    ) {
      motionQuery.addEventListener(
        'change',
        updateMotionPreference
      );

      return () => {
        motionQuery.removeEventListener(
          'change',
          updateMotionPreference
        );
      };
    }

    motionQuery.addListener(
      updateMotionPreference
    );

    return () => {
      motionQuery.removeListener(
        updateMotionPreference
      );
    };
  }, []);

  useEffect(() => {
    if (!motionAllowed) {
      setFrame(
        renderAsciiDonut(
          staticAngleA,
          staticAngleB
        )
      );

      return undefined;
    }

    let angleA = staticAngleA;
    let angleB = staticAngleB;

    const intervalId = window.setInterval(() => {
      angleA += 0.08;
      angleB += 0.035;

      setFrame(
        renderAsciiDonut(angleA, angleB)
      );
    }, 75);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [motionAllowed]);

  return (
    <pre
      className="home-monitor-art home-monitor-donut"
      aria-hidden="true"
    >
      {frame}
    </pre>
  );
};

const NAV_MONITOR_PREVIEWS = {
  home: {
    label: 'HOME / LIVE RENDER',
    status: 'Torus online',
    caption: 'Realtime ASCII geometry',
    art: '',
  },
  work: {
    label: 'WORK / PROJECT FILES',
    status: 'Three files',
    caption: 'Systems / product / simulation',
    art: String.raw`
      .--------.   .--------.
      | FILE 1 |   | FILE 2 |
      |  C++   |   |  TS    |
      '--------'   '--------'

           .--------.
           | FILE 3 |
           |  SIM   |
           '--------'
`,
  },
  experience: {
    label: 'EXPERIENCE / TIMELINE',
    status: 'Record view',
    caption: 'Education / work / development',
    art: String.raw`
      2019  o
            |
      2023  o---- COMPUTER SCIENCE
            |
      2026  o---- FIRST CLASS MCOMP
            |
      NEXT  o---- DURHAM MSC
`,
  },
  about: {
    label: 'ABOUT / ROUTE',
    status: 'Four locations',
    caption: 'Thailand / Jubail / Newcastle / Durham',
    art: String.raw`
      THAILAND  o-------->  JUBAIL
                              |
                              v
      NEWCASTLE o-------->  DURHAM

      ONE ROUTE / DIFFERENT SYSTEMS
`,
  },
  contact: {
    label: 'CONTACT / SIGNAL',
    status: 'Channels ready',
    caption: 'Email / GitHub / LinkedIn',
    art: String.raw`
        .------.           .------.
        | SEND |===========| RECV |
        '------'           '------'

        EMAIL   GITHUB   LINKEDIN
             SIGNAL AVAILABLE
`,
  },
  resume: {
    label: 'RESUME / DOCUMENT',
    status: 'Draft asset',
    caption: 'Downloadable CV',
    art: String.raw`
          .----------------.
          |  OLIVER WILDE  |
          |----------------|
          | EXPERIENCE     |
          | PROJECTS       |
          | EDUCATION      |
          | TECHNICAL WORK |
          '----------------'
`,
  },
};

const AsciiMonitorPreview = ({ previewSection = 'home' }) => {
  const previewKey =
    NAV_MONITOR_PREVIEWS[previewSection]
      ? previewSection
      : 'home';

  const preview = NAV_MONITOR_PREVIEWS[previewKey];

  return (
    <figure
      className="home-hero-media home-monitor-preview"
      aria-label="Navigation-controlled CRT preview"
    >
      <div className="home-monitor-stage">
        <div className="home-monitor-device">
          <div className="home-monitor-shell">
            <div
              className="home-monitor-shell-top"
              aria-hidden="true"
            />

            <div className="home-monitor-bezel">
              <div
                className="home-monitor-screen"
                key={previewKey}
                role="img"
                aria-label={`Navigation preview for ${preview.label}`}
                aria-live="polite"
              >
                <div className="home-monitor-content">
                  {previewKey === 'home' ? (
                    <AsciiDonut />
                  ) : (
                    <pre
                      className="home-monitor-art"
                      aria-hidden="true"
                    >
                      {preview.art}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            <div className="home-monitor-panel" aria-hidden="true">
              <span className="home-monitor-badge">
                SYSTEM / 32
              </span>

              <div className="home-monitor-buttons">
                <span />
                <span />
              </div>

              <span className="home-monitor-led" />
            </div>
          </div>

          <div className="home-monitor-neck" aria-hidden="true" />
          <div className="home-monitor-base" aria-hidden="true" />
        </div>
      </div>
    </figure>
  );
};
const HomePanel = ({ previewSection = 'home' }) => (
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
          <a
            className="home-hero-action home-hero-action-primary"
            href="#work"
          >
            <span>View selected work</span>

            <span className="home-file-icon" aria-hidden="true">
              <FileIcon />
            </span>
          </a>

          <a className="home-hero-action" href="#contact">
            <span>Contact and profiles</span>

            <span className="home-contact-icon" aria-hidden="true" />
          </a>
        </div>
      </div>

      <AsciiMonitorPreview previewSection={previewSection} />
    </header>

    <div className="workspace-grid workspace-grid-home">
      <article className="workspace-card home-credential-card">
        <div className="home-card-topline">
          <p className="workspace-card-label">Education</p>

          <span
            className="home-panel-icon-slot home-panel-icon-placeholder"
            aria-hidden="true"
          >
            <span className="home-panel-icon-index">01</span>
          </span>
        </div>

        <h2>First Class MComp</h2>
        <p>Computer Science at Newcastle University.</p>
      </article>

      <article className="workspace-card home-credential-card">
        <div className="home-card-topline">
          <p className="workspace-card-label">Next</p>

          <span
            className="home-panel-icon-slot home-panel-icon-placeholder"
            aria-hidden="true"
          >
            <span className="home-panel-icon-index">02</span>
          </span>
        </div>

        <h2>Durham MSc</h2>
        <p>Advanced Computer Science, 2026&ndash;2027.</p>
      </article>

      <article className="workspace-card home-credential-card">
        <div className="home-card-topline">
          <p className="workspace-card-label">Direction</p>

          <span
            className="home-panel-icon-slot home-panel-icon-placeholder"
            aria-hidden="true"
          >
            <span className="home-panel-icon-index">03</span>
          </span>
        </div>

        <h2>Systems and performance</h2>

        <p>
          Interested in backend systems, JVM software, databases, and
          performance.
        </p>
      </article>

      <article className="workspace-card workspace-card-featured home-launchpad">
        <div className="home-card-topline">
          <p className="workspace-card-label">Selected work</p>

          <span
            className="home-panel-icon-slot home-panel-icon-file"
            aria-hidden="true"
          >
            <span className="home-file-icon">
              <FileIcon />
            </span>
          </span>
        </div>

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

            <span className="home-file-icon" aria-hidden="true">
              <FileIcon />
            </span>
          </a>

          <a
            className="home-project-link"
            href="#work/stnly-storefront"
          >
            <span>STNLY Storefront</span>

            <span className="home-file-icon" aria-hidden="true">
              <FileIcon />
            </span>
          </a>

          <a
            className="home-project-link"
            href="#work/ipd"
          >
            <span>Iterated Prisoner&apos;s Dilemma</span>

            <span className="home-file-icon" aria-hidden="true">
              <FileIcon />
            </span>
          </a>
        </div>

        <a className="home-contact-link" href="#contact">
          <span>Contact and profiles</span>

          <span className="home-contact-icon" aria-hidden="true" />
        </a>
      </article>
    </div>
  </section>
);

const ProjectCaseStudy = ({
  project,
  onClose,
  detailRef,
  toolbarIconRef,
}) => (
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
      <div className="case-study-file-identity">
        <span
          ref={toolbarIconRef}
          className="case-study-toolbar-file"
          aria-hidden="true"
        >
          <FileIcon />
        </span>

        <span className="case-study-path">
          <span>WORK</span>
          <span aria-hidden="true">/</span>
          <span>{project.title.toUpperCase()}</span>
        </span>
      </div>

      <button
        className="case-study-close"
        type="button"
        onClick={onClose}
      >
        <span>Close file</span>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <header className="case-study-hero">
      <div className="case-study-title-block">
        <p className="workspace-eyebrow">
          {project.category}
        </p>

        <h2 id={`case-study-${project.id}`}>
          {project.title}
        </h2>
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

      <div className="case-study-meta-repository">
        <dt>Repository</dt>

        <dd>
          {project.repositoryUrl ? (
            <a
              className="case-study-meta-link"
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View source</span>

              <span
                className="case-study-meta-file"
                aria-hidden="true"
              >
                <FileIcon />
              </span>
            </a>
          ) : (
            <span>Not published</span>
          )}
        </dd>
      </div>
    </dl>

    {(project.liveUrl || project.reportUrl) && (
      <div
        className="case-study-actions"
        aria-label="Additional project links"
      >
        {project.liveUrl && (
          <a
            className="case-study-action"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View live project
            <span aria-hidden="true">&rarr;</span>
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
            <span aria-hidden="true">&rarr;</span>
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
        <p className="workspace-card-label">
          Engineering decisions
        </p>

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

const ProjectMotionShell = ({
  project,
  destinationRef,
  placeholderHeight,
}) => (
  <article
    className="case-study-window case-study-motion-shell"
    aria-hidden="true"
    style={
      placeholderHeight > 0
        ? { minHeight: `${placeholderHeight}px` }
        : undefined
    }
  >
    <div className="case-study-toolbar">
      <div className="case-study-file-identity">
        <span
          ref={destinationRef}
          className="case-study-toolbar-file"
        >
          <FileIcon />
        </span>

        <span className="case-study-path">
          <span>WORK</span>
          <span>/</span>
          <span>{project.title.toUpperCase()}</span>
        </span>
      </div>

      <span className="case-study-close case-study-motion-close">
        <span>Close file</span>
        <span>&times;</span>
      </span>
    </div>
  </article>
);

const WorkMovingFile = ({ motion }) => (
  <span
    className="work-file-motion-layer"
    aria-hidden="true"
    style={{
      '--file-left': `${motion.left}px`,
      '--file-top': `${motion.top}px`,
      '--file-start-scale': motion.startScale,
      '--file-target-x': `${motion.targetX}px`,
      '--file-target-y': `${motion.targetY}px`,
      '--file-target-scale': motion.targetScale,
    }}
  >
    <FileIcon />
  </span>
);

const WorkPanel = ({
  activeProjectId,
  onOpenProject,
  onCloseProject,
}) => {
  const initialProject =
    projects.find(
      (project) => project.id === activeProjectId
    ) || null;

  const [selectedProject, setSelectedProject] =
    useState(initialProject);

  const [pendingProject, setPendingProject] =
    useState(null);

  const [closingProjectId, setClosingProjectId] =
    useState(null);

  const [motionPhase, setMotionPhase] = useState(
    initialProject ? 'open' : 'browser'
  );

  const [movingFile, setMovingFile] = useState(null);

  const [motionShellHeight, setMotionShellHeight] =
    useState(0);

  const detailRef = useRef(null);
  const projectGridRef = useRef(null);
  const triggerRefs = useRef({});
  const toolbarIconRef = useRef(null);
  const motionDestinationRef = useRef(null);
  const motionTimersRef = useRef([]);
  const scrollFrameRef = useRef(null);
  const localMotionRef = useRef(false);

  const cancelScrollTracking = () => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(
        scrollFrameRef.current
      );

      scrollFrameRef.current = null;
    }
  };

  const clearMotionTimers = () => {
    motionTimersRef.current.forEach((timerId) => {
      window.clearTimeout(timerId);
    });

    motionTimersRef.current = [];
    cancelScrollTracking();
  };

  const queueMotionTimer = (callback, delay) => {
    const timerId = window.setTimeout(callback, delay);
    motionTimersRef.current.push(timerId);
    return timerId;
  };

  const focusWithoutScroll = (element) => {
    if (!element) {
      return;
    }

    try {
      element.focus({ preventScroll: true });
    } catch {
      element.focus();
    }
  };

  const getExplorerScrollOffset = () => {
    if (
      !window.matchMedia(
        '(max-width: 820px)'
      ).matches
    ) {
      return 16;
    }

    const navigation =
      document.querySelector('.site-sidebar');

    const navigationHeight = navigation
      ? navigation.getBoundingClientRect().height
      : 0;

    return navigationHeight + 16;
  };

  const scrollToFileExplorer = (callback) => {
    cancelScrollTracking();

    const projectGrid = projectGridRef.current;

    if (!projectGrid) {
      callback();
      return;
    }

    const gridRect =
      projectGrid.getBoundingClientRect();

    const targetTop = Math.max(
      0,
      window.scrollY +
        gridRect.top -
        getExplorerScrollOffset()
    );

    if (
      Math.abs(window.scrollY - targetTop) <= 2
    ) {
      callback();
      return;
    }

    const startedAt = window.performance.now();

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });

    const inspectScrollPosition = () => {
      const reachedTarget =
        Math.abs(window.scrollY - targetTop) <= 2;

      const timedOut =
        window.performance.now() - startedAt > 900;

      if (reachedTarget || timedOut) {
        scrollFrameRef.current = null;
        callback();
        return;
      }

      scrollFrameRef.current =
        window.requestAnimationFrame(
          inspectScrollPosition
        );
    };

    scrollFrameRef.current =
      window.requestAnimationFrame(
        inspectScrollPosition
      );
  };

  const prefersReducedMotion = () =>
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  const getRenderedIconRect = (container) => {
    if (!container) {
      return null;
    }

    const icon =
      container.matches?.('.project-file-icon')
        ? container
        : container.querySelector('.project-file-icon');

    return icon
      ? icon.getBoundingClientRect()
      : null;
  };

  const createMotionState = (rect) => {
    const rootFontSize =
      Number.parseFloat(
        window.getComputedStyle(
          document.documentElement
        ).fontSize
      ) || 16;

    const naturalWidth = 3.25 * rootFontSize;

    return {
      left: rect.left,
      top: rect.top,
      startScale: rect.width / naturalWidth,
      targetX: 0,
      targetY: 0,
      targetScale: rect.width / naturalWidth,
    };
  };

  useEffect(() => {
    return () => {
      clearMotionTimers();
      cancelScrollTracking();
    };
  }, []);

  useEffect(() => {
    if (localMotionRef.current) {
      return;
    }

    const nextProject =
      projects.find(
        (project) => project.id === activeProjectId
      ) || null;

    clearMotionTimers();
    setPendingProject(null);
    setClosingProjectId(null);
    setMovingFile(null);
    setMotionShellHeight(0);
    setSelectedProject(nextProject);
    setMotionPhase(nextProject ? 'open' : 'browser');
  }, [activeProjectId]);

  useEffect(() => {
    if (
      selectedProject &&
      motionPhase === 'open' &&
      detailRef.current
    ) {
      focusWithoutScroll(detailRef.current);
    }
  }, [selectedProject, motionPhase]);

  useLayoutEffect(() => {
    if (
      motionPhase === 'opening-shell' &&
      pendingProject &&
      movingFile &&
      motionDestinationRef.current
    ) {
      const targetRect = getRenderedIconRect(
        motionDestinationRef.current
      );

      if (!targetRect) {
        setSelectedProject(pendingProject);
        setMotionPhase('opening-reveal');

        if (onOpenProject) {
          onOpenProject(pendingProject.id);
        }

        queueMotionTimer(() => {
          setMovingFile(null);
          setPendingProject(null);
          setMotionShellHeight(0);
          setMotionPhase('open');
          localMotionRef.current = false;
        }, 420);

        return;
      }

      const rootFontSize =
        Number.parseFloat(
          window.getComputedStyle(
            document.documentElement
          ).fontSize
        ) || 16;

      const naturalWidth = 3.25 * rootFontSize;

      setMovingFile((current) => ({
        ...current,
        targetX: targetRect.left - current.left,
        targetY: targetRect.top - current.top,
        targetScale:
          targetRect.width / naturalWidth,
      }));

      setMotionPhase('opening-ready');

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setMotionPhase('opening-flight');

          queueMotionTimer(() => {
            const projectToOpen = pendingProject;

            setSelectedProject(projectToOpen);
            setMotionPhase('opening-reveal');

            if (onOpenProject) {
              onOpenProject(projectToOpen.id);
            }

            queueMotionTimer(() => {
              setMovingFile(null);
              setPendingProject(null);
              setMotionPhase('open');
              localMotionRef.current = false;
            }, 420);
          }, 460);
        });
      });
    }

    if (
      motionPhase === 'closing-grid' &&
      closingProjectId &&
      movingFile
    ) {
      const targetButton =
        triggerRefs.current[closingProjectId];

      const targetRect = getRenderedIconRect(
        targetButton
      );

      if (!targetRect) {
        setMovingFile(null);
        setClosingProjectId(null);
        setMotionPhase('browser');
        localMotionRef.current = false;

        if (onCloseProject) {
          onCloseProject();
        }

        return;
      }

      const rootFontSize =
        Number.parseFloat(
          window.getComputedStyle(
            document.documentElement
          ).fontSize
        ) || 16;

      const naturalWidth = 3.25 * rootFontSize;

      setMovingFile((current) => ({
        ...current,
        targetX: targetRect.left - current.left,
        targetY: targetRect.top - current.top,
        targetScale:
          targetRect.width / naturalWidth,
      }));

      setMotionPhase('closing-ready');

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setMotionPhase('closing-flight');

          queueMotionTimer(() => {
            setMotionPhase('closing-reveal');

            if (onCloseProject) {
              onCloseProject();
            }

            queueMotionTimer(() => {
              const previousTrigger =
                triggerRefs.current[closingProjectId];

              setMovingFile(null);
              setClosingProjectId(null);
              setMotionPhase('browser');
              localMotionRef.current = false;

              if (previousTrigger) {
                previousTrigger.focus();
              }
            }, 420);
          }, 460);
        });
      });
    }
  }, [
    motionPhase,
    pendingProject,
    closingProjectId,
    movingFile,
  ]);

  const openProject = (project) => {
    if (localMotionRef.current) {
      return;
    }

    const trigger = triggerRefs.current[project.id];
    const sourceRect = getRenderedIconRect(trigger);

    if (
      prefersReducedMotion() ||
      !sourceRect
    ) {
      setSelectedProject(project);
      setMotionPhase('open');

      if (onOpenProject) {
        onOpenProject(project.id);
      }

      return;
    }

    clearMotionTimers();
    localMotionRef.current = true;

    const gridRect =
      projectGridRef.current
        ? projectGridRef.current.getBoundingClientRect()
        : null;

    setMotionShellHeight(
      gridRect ? gridRect.height : 0
    );

    setPendingProject(project);
    setMovingFile(createMotionState(sourceRect));
    setMotionPhase('opening-hide');

    queueMotionTimer(() => {
      setMotionPhase('opening-scroll');

      scrollToFileExplorer(() => {
        setMotionPhase('opening-shell');
      });
    }, 280);
  };

  const closeProject = () => {
    if (
      localMotionRef.current ||
      !selectedProject
    ) {
      return;
    }

    const projectToClose = selectedProject;

    const sourceRect = getRenderedIconRect(
      toolbarIconRef.current
    );

    if (
      prefersReducedMotion() ||
      !sourceRect
    ) {
      setSelectedProject(null);
      setMotionPhase('browser');

      if (onCloseProject) {
        onCloseProject();
      }

      window.requestAnimationFrame(() => {
        const previousTrigger =
          triggerRefs.current[projectToClose.id];

        if (previousTrigger) {
          focusWithoutScroll(previousTrigger);
        }
      });

      return;
    }

    clearMotionTimers();
    localMotionRef.current = true;

    setClosingProjectId(projectToClose.id);
    setMovingFile(createMotionState(sourceRect));
    setSelectedProject(null);
    setMotionPhase('closing-grid');
  };

  const openingShellVisible = [
    'opening-shell',
    'opening-ready',
    'opening-flight',
  ].includes(motionPhase);

  const openingInProgress = motionPhase.startsWith(
    'opening-'
  );

  const closingInProgress = motionPhase.startsWith(
    'closing-'
  );

  const browserVisible =
    !selectedProject &&
    !openingShellVisible;

  return (
    <section
      className={`workspace-panel work-panel is-${motionPhase}`}
      aria-labelledby="work-panel-title"
      aria-busy={
        openingInProgress ||
        closingInProgress
      }
    >
      <header className="workspace-heading">
        <p className="workspace-eyebrow">02 / Work</p>
        <h1 id="work-panel-title">Project files</h1>

        <p className="workspace-lead">
          Open a file to inspect the problem, role, technical approach,
          engineering decisions, and evidence behind the work.
        </p>
      </header>

      {selectedProject && (
        <ProjectCaseStudy
          project={selectedProject}
          onClose={closeProject}
          detailRef={detailRef}
          toolbarIconRef={toolbarIconRef}
        />
      )}

      {openingShellVisible && pendingProject && (
        <ProjectMotionShell
          project={pendingProject}
          destinationRef={motionDestinationRef}
          placeholderHeight={motionShellHeight}
        />
      )}

      {browserVisible && (
        <div
          ref={projectGridRef}
          className="project-file-grid"
        >
          {projects
            .filter((project) => !project.hidden)
            .map((project, index) => {
              const isMotionSource =
                openingInProgress &&
                pendingProject?.id === project.id;

              const isMotionTarget =
                closingInProgress &&
                closingProjectId === project.id;

              return (
                <button
                  key={project.id}
                  ref={(element) => {
                    triggerRefs.current[project.id] =
                      element;
                  }}
                  className={[
                    'project-file',
                    isMotionSource
                      ? 'is-motion-source'
                      : '',
                    isMotionTarget
                      ? 'is-motion-target'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  disabled={motionPhase !== 'browser'}
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

                  <span
                    className="project-file-motion-band"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
        </div>
      )}

      {movingFile && (
        <WorkMovingFile motion={movingFile} />
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
  navPreviewSection,
  onOpenProject,
  onCloseProject,
  isTransitioning,
}) => {
  useScrollReveal(
    activeSection,
    activeProjectId,
    isTransitioning
  );

  if (activeSection === 'home') {
    return (
      <HomePanel previewSection={navPreviewSection} />
    );
  }

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