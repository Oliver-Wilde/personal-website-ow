import React from 'react';
import { Navbar, Mouse, ScrollBar } from './components';
import { Hero_section, About_me, Project_section } from './containers';
import './App.css';
import { Scrollbars } from 'react-custom-scrollbars-2';

const App = () => {
  return (
    <div className='App'>
      <div className='background-colour'>
        <Mouse />
        <Navbar />
        <ScrollBar >
          <Hero_section />
          {/* Add other content here */}
          {/* <About_me /> */}
          <Project_section />
        </ScrollBar>
      </div>
    </div>
  );
};

export default App;