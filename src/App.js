import React, { useEffect, useState } from 'react';
import { Navbar, Mouse, ScrollBar } from './components';
import {
  HeroSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  ContactSection,
} from './containers';
import Portfolio from './containers/Portfolio/portfolio';
import './App.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const SECTION_COMPONENTS = {
  portfolio: Portfolio,
  about: AboutSection,
  skills: SkillsSection,
  experience: ProjectsSection,
  contact: ContactSection,
};

const App = () => {
  const [hoverWord, setHoverWord] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    AOS.init();
  }, []);

  const ActiveSection = SECTION_COMPONENTS[activeSection];

  return (
    <div className="App">
      <div className="background-colour">
        <Mouse />
        <Navbar setHoverWord={setHoverWord} setActiveSection={setActiveSection} />
        <ScrollBar>
          <HeroSection hoverWord={hoverWord} />
          {ActiveSection && <ActiveSection />}
        </ScrollBar>
      </div>
    </div>
  );
};

export default App;
