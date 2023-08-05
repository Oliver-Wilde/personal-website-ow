import React from 'react'
import './skills_section.css'
import python from '../../assets/python hover.png'

const Skills_section = () => {
  return (
    <div className='card-padding'>
      <div className='card'>
        <img src={python} alt="Python" />

      </div>
    </div>
  )
}

export default Skills_section;