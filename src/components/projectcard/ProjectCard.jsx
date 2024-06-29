import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, image, link, role, teamSize, engine, responsibilities, projectType }) => {
    return (
        <div className="project-card">
            <div className="project-card-header">
                <img src={image} alt={title} className="project-card-image" />
                <div>
                    <h3 className="project-card-title">{title}</h3>
                    <h4 className="project-card-role">{role}</h4>
                </div>
            </div>
            <p className="project-card-description">{description}</p>
            <p className="project-card-info">
                {teamSize && <><strong>Team Size:</strong> {teamSize}<br /></>}
                {engine && <><strong>Engine:</strong> {engine}</>}
            </p>
            {responsibilities && (
                <p className="project-card-responsibilities">
                    <strong>What I worked on:</strong>
                    <ul>
                        {responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>
                </p>
            )}
            <div className="project-card-footer">
                <a href={link} className="project-card-link">View {projectType}</a>
            </div>
        </div>
    );
};

export default ProjectCard;
