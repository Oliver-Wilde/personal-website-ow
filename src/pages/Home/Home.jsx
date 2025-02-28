// src/pages/Home/Home.jsx
import React from 'react';
import './Home.css';
import CellularAutomata from '../../components/cellularAutomata/CellularAutomata';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to My Website</h1>
            <p>
                This is the Home page. Check out the cellular automata below!
            </p>
            
            {/* Include the CA component */}
            <CellularAutomata />
        </div>
    );
};

export default Home;
