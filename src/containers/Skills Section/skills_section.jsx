import React from 'react';
import './skills_section.css';
import python from '../../assets/python hover.png';
import Card from '../../components/card/card'; // Import the Card component

const Skills_section = () => {
  return (
    <div className='card-padding'>
      <Card image={python} />
      {/* You can add more cards here with different images */}
    </div>
  );
};

export default Skills_section;
