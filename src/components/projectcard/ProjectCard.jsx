import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, image, link }) => {
    return (
        <div className="project-card">
            <img src={image} alt={title} className="project-card-image" />
            <div className="project-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>
            </div>
        </div>
    );
};

export default ProjectCard;
