import React from 'react';
import ProjectCard from '../projectcard/ProjectCard';
import './ProjectsList.css';

const ProjectsList = ({ projects, filter }) => {
    // Filter projects based on criteria if filter is provided
    const displayedProjects = filter
        ? projects.filter(project => filter(project))
        : projects;

    return (
        <div className="projects-list-container">
            {displayedProjects.map(project => (
                <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    skills={project.skills}
                    githubLink={project.githubLink}
                    liveLink={project.liveLink}
                />
            ))}
        </div>
    );
};

export default ProjectsList;
