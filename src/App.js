import React, { useEffect } from 'react';
import { Navbar, Mouse, ScrollBar } from './components';
import { Hero_section, About_me, Project_section, Skills_section } from './containers';
import './App.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const App = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS library when the component mounts
  }, []);

  return (
    <div className='App'>
      <div className='background-colour'>
        <Mouse />
        <Navbar />
        <ScrollBar>
          <Hero_section />
          {/* Add other content here */}
          
          {/* <Project_section /> */}
          <About_me />
          <Skills_section/>
        </ScrollBar>
      </div>
    </div>
  );
};

export default App;
