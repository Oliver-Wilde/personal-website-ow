import React, { useEffect, useState } from 'react';
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
  projects.map((project) => project.id)
);

const HOME_ROUTE = {
  section: 'home',
  projectId: null,
  hash: 'home',
};

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

const App = () => {
  const [route, setRoute] = useState(
    () => readRouteFromHash()
  );

  useEffect(() => {
    const synchroniseRoute = (shouldFocus) => {
      const nextRoute = readRouteFromHash();
      const canonicalHash = `#${nextRoute.hash}`;

      if (window.location.hash !== canonicalHash) {
        window.history.replaceState(
          null,
          '',
          canonicalHash
        );
      }

      setRoute(nextRoute);

      if (shouldFocus) {
        focusWorkspace();
      }
    };

    synchroniseRoute(false);

    const handleHashChange = () => {
      synchroniseRoute(true);
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
    <div className="portfolio-shell">
      <Navbar
        activeSection={route.section}
        onSelectSection={handleSelectSection}
      />

      <main
        id="workspace-main"
        className="workspace-main"
        tabIndex="-1"
      >
        <WorkspaceContent
          activeSection={route.section}
          activeProjectId={route.projectId}
          onOpenProject={handleOpenProject}
          onCloseProject={handleCloseProject}
        />
      </main>
    </div>
  );
};

export default App;