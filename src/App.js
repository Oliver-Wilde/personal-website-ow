import React, { useEffect } from 'react';
import { Navbar, Mouse, ScrollBar } from './components';
import { Hero_section, About_me, Project_section, Skills_section } from './containers';
import Portfolio from '../src/containers/Portfolio/portfolio'; // Import the Portfolio component
import './App.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Slider from './components/slider/Slider';

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
          {/* Add Portfolio component */}
          <Portfolio />
          {/* <Project_section /> */}
        </ScrollBar>
      </div>
    </div>
  );
};

export default App;
