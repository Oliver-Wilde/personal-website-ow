import React from 'react';
import './skills_section.css';
import python from '../../assets/python hover.png';
import java from '../../assets/java hover.png';
import react from '../../assets/react hover.png';
import js from '../../assets/js hover.png';
import html from '../../assets/html hover.png';
import css from '../../assets/css hover.png';
import Card from '../../components/card/card'; // Import the Card component

const Skills_section = () => {
  return (
    <div id="skills" className='card-padding'>
      <div className='card-background-bloo'>
        <div className='card-container'>
          <Card image={python} />
          <Card image={java} />
          <Card image={react}/>
          <Card image={html}/>
          <Card image={css}/>
          <Card image={js}/>
        </div>
      </div>
    </div>
  );
};

export default Skills_section;
