import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsList.css';

const ProjectsList = ({ projects }) => {
    return (
        <div className="projects-list">
            {projects.map((project, idx) => (
                <ProjectCard
                    key={idx}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    link={project.link}
                />
            ))}
        </div>
    );
};

export default ProjectsList;
