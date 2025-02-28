// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onHoverNavItem }) => {
    return (
        <nav className="nav-container">
            <div className="nav-logo">
                <Link to="/">MyLogo</Link>
            </div>
            <ul className="nav-links">
                <li
                    onMouseEnter={() => onHoverNavItem('Home')}
                    onMouseLeave={() => onHoverNavItem('')}
                >
                    <Link to="/">Home</Link>
                </li>
                <li
                    onMouseEnter={() => onHoverNavItem('About')}
                    onMouseLeave={() => onHoverNavItem('')}
                >
                    <Link to="/about">About</Link>
                </li>
                <li
                    onMouseEnter={() => onHoverNavItem('Projects')}
                    onMouseLeave={() => onHoverNavItem('')}
                >
                    <Link to="/projects">Projects</Link>
                </li>
                <li
                    onMouseEnter={() => onHoverNavItem('Contact')}
                    onMouseLeave={() => onHoverNavItem('')}
                >
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
