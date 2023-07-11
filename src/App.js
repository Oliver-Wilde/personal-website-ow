import React from 'react'

import { Navbar } from './components';
import { Hero_section, About_me  } from './containers';
import './App.css';

const App = () => {
  return (
    <div className='App'>
       <div className='background-colour'>
        <Navbar/>
        
       </div>
        <Hero_section></Hero_section>
    </div>
    
  )
}

export default App