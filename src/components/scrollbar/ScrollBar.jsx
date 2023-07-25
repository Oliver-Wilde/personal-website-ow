import React from 'react';

import './ScrollBar.css';

const ScrollBar = ({ children }) => {
  return (
    <div className="scroll-bar">
      <div className="scroll-bar-content">
        {children}
      </div>
    </div>
  );
};

export default ScrollBar;