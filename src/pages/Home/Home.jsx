// src/pages/Home/Home.jsx
import React from 'react';
import CellularAutomata from '../../components/cellularAutomata/CellularAutomata';
import './Home.css';

const Home = ({ hoveredText }) => {
    return (
        <div className="home-container">
            <h1>Welcome to My Website</h1>
            <p>
                Hover over the Navbar to see the CA form the hovered text.
            </p>

            <CellularAutomata hoveredText={hoveredText} />
        </div>
    );
};

export default Home;
