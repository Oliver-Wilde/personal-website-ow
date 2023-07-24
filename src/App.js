import React, {useState} from 'react';
import { Navbar, mouse } from './components';
import { Hero_section, About_me  } from './containers';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <div className='background-colour'>
        <mouse/>
        <Navbar/>
        
      </div>
        <Hero_section></Hero_section>
    </div>
    
  )
}

export default App