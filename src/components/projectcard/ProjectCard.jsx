import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, image, skills, githubLink, liveLink }) => {
    return (
        <div className="project-card">
            <div className="project-card-image">
                <img src={image} alt={title} />
            </div>
            <div className="project-card-content">
                <h3>{title}</h3>
                <p>{description}</p>

                <div className="project-card-skills">
                    {skills && skills.map((skill, index) => (
                        <span key={index} className="project-skill-tag">{skill}</span>
                    ))}
                </div>

                <div className="project-card-links">
                    {githubLink && (
                        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                            GitHub
                        </a>
                    )}
                    {liveLink && (
                        <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
