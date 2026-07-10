import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import WorkspaceContent from './components/workspace/WorkspaceContent';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleSelectSection = (section) => {
    setActiveSection(section);

    window.requestAnimationFrame(() => {
      const workspace = document.getElementById('workspace-main');

      if (workspace) {
        workspace.focus();
      }
    });
  };

  return (
    <div className="portfolio-shell">
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      <main
        id="workspace-main"
        className="workspace-main"
        tabIndex="-1"
      >
        <WorkspaceContent activeSection={activeSection} />
      </main>
    </div>
  );
};

export default App;