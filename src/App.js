import React, { useEffect, useState } from 'react';
import { Navbar, Mouse, ScrollBar } from './components';
import { Hero_section, About_me, Project_section, Skills_section } from './containers';
import Portfolio from './containers/Portfolio/portfolio';
import Contact_section from './containers/Contact_section/Contact_section';
import './App.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const App = () => {
  const [hoverWord, setHoverWord] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='App'>
      <div className='background-colour'>
        <Mouse />
        <Navbar setHoverWord={setHoverWord} setActiveSection={setActiveSection} />
        <ScrollBar>
          <Hero_section hoverWord={hoverWord} />
          {activeSection === 'portfolio' && <Portfolio />}
          {activeSection === 'about' && <About_me />}
          {activeSection === 'skills' && <Skills_section />}
          {activeSection === 'experience' && <Project_section />}
          {activeSection === 'contact' && <Contact_section />}
        </ScrollBar>
      </div>
    </div>
  );
};

export default App;