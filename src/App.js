import React, {useState} from 'react';
import  { Navbar,Mouse } from './components';
import { Hero_section, About_me, Project_section  } from './containers';
import './App.css';


const App = () => {
  return (
    <div className='App'>
      <div className='background-colour'>
        <Mouse></Mouse>
        <Navbar/>
        <Hero_section/>
        <About_me/>
        
        
      </div>
    </div>
    
  )
}

export default App