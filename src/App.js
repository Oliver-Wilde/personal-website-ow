import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import WorkspaceContent from './components/workspace/WorkspaceContent';
import projects from './data/projects';
import './App.css';

const SECTION_IDS = new Set([
  'home',
  'work',
  'experience',
  'about',
  'contact',
]);

const PROJECT_IDS = new Set(
  projects.filter((project) => !project.hidden).map((project) => project.id)
);

const HOME_ROUTE = {
  section: 'home',
  projectId: null,
  hash: 'home',
};
const TRANSITION_BAND_COUNT = 7;
const TRANSITION_SWAP_DELAY_MS = 430;
const TRANSITION_END_DELAY_MS = 920;

const readRouteFromHash = () => {
  const rawHash = window.location.hash
    .replace(/^#/, '')
    .trim()
    .toLowerCase();

  const parts = rawHash.split('/').filter(Boolean);

  if (
    parts.length === 1 &&
    SECTION_IDS.has(parts[0])
  ) {
    return {
      section: parts[0],
      projectId: null,
      hash: parts[0],
    };
  }

  if (
    parts.length === 2 &&
    parts[0] === 'work' &&
    PROJECT_IDS.has(parts[1])
  ) {
    return {
      section: 'work',
      projectId: parts[1],
      hash: `work/${parts[1]}`,
    };
  }

  return HOME_ROUTE;
};

const focusWorkspace = () => {
  window.requestAnimationFrame(() => {
    const workspace = document.getElementById('workspace-main');

    if (workspace) {
      workspace.focus();
    }
  });
};


const PageTransition = ({ phase }) => (
  <div
    className={`page-transition${phase !== 'idle' ? ` is-${phase}` : ''}`}
    aria-hidden="true"
  >
    {Array.from({ length: TRANSITION_BAND_COUNT }, (_, index) => (
      <span
        className="page-transition-band"
        key={index}
        style={{
          '--transition-top':
            `${(index / TRANSITION_BAND_COUNT) * 100}%`,
          '--transition-height':
            `${100 / TRANSITION_BAND_COUNT}%`,          '--transition-delay': `${index * 24}ms`,
          '--transition-reverse-delay':
            `${(TRANSITION_BAND_COUNT - index - 1) * 24}ms`,
        }}
      />
    ))}
  </div>
);
const App = () => {
  const [route, setRoute] = useState(
    () => readRouteFromHash()
  );
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const transitionTimersRef = useRef([]);

  useEffect(() => {
    const clearTransitionTimers = () => {
      transitionTimersRef.current.forEach((timerId) => {
        window.clearTimeout(timerId);
      });

      transitionTimersRef.current = [];
    };

    const commitRoute = (nextRoute, shouldFocus) => {
      setRoute(nextRoute);

      if (shouldFocus) {
        focusWorkspace();
      }
    };

    const synchroniseRoute = (shouldFocus, shouldAnimate) => {
      const nextRoute = readRouteFromHash();
      const canonicalHash = `#${nextRoute.hash}`;

      if (window.location.hash !== canonicalHash) {
        window.history.replaceState(
          null,
          '',
          canonicalHash
        );
      }

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      clearTransitionTimers();

      if (!shouldAnimate || prefersReducedMotion) {
        setTransitionPhase('idle');
        commitRoute(nextRoute, shouldFocus);
        return;
      }

      setTransitionPhase('covering');

      const swapTimer = window.setTimeout(() => {
        commitRoute(nextRoute, shouldFocus);
        setTransitionPhase('revealing');
      }, TRANSITION_SWAP_DELAY_MS);

      const endTimer = window.setTimeout(() => {
        setTransitionPhase('idle');
      }, TRANSITION_END_DELAY_MS);

      transitionTimersRef.current = [
        swapTimer,
        endTimer,
      ];
    };

    synchroniseRoute(false, false);

    const handleHashChange = () => {
      synchroniseRoute(true, true);
    };

    window.addEventListener(
      'hashchange',
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        'hashchange',
        handleHashChange
      );

      clearTransitionTimers();
    };
  }, []);

  const navigateToHash = (hash) => {
    const targetHash = `#${hash}`;

    if (window.location.hash === targetHash) {
      setRoute(readRouteFromHash());
      focusWorkspace();
      return;
    }

    window.location.hash = hash;
  };

  const handleSelectSection = (section) => {
    navigateToHash(section);
  };

  const handleOpenProject = (projectId) => {
    navigateToHash(`work/${projectId}`);
  };

  const handleCloseProject = () => {
    navigateToHash('work');
  };

  return (
    <>
      <div className="portfolio-shell">
        <Navbar
          activeSection={route.section}
          onSelectSection={handleSelectSection}
        />

        <main
          id="workspace-main"
          className="workspace-main"
          tabIndex="-1"
          aria-busy={transitionPhase !== 'idle'}
        >
          <WorkspaceContent
            activeSection={route.section}
            activeProjectId={route.projectId}
            onOpenProject={handleOpenProject}
            onCloseProject={handleCloseProject}
          />
        </main>
      </div>

      <PageTransition phase={transitionPhase} />
    </>
  );
};

export default App;