import React from 'react';
import { Navbar, Mouse, ScrollBar } from './components';
import { Hero_section, About_me, Project_section } from './containers';
import './App.css';


const App = () => {
  return (
    <div className='App'>
      <div className='background-colour'>
        <Mouse />
        <Navbar />
        <ScrollBar >
          <Hero_section />
          {/* Add other content here */}
          
          <Project_section />
          <About_me />
        </ScrollBar>
      </div>
    </div>
  );
};

export default App;