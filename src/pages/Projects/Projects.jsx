import React from 'react';
import './Projects.css';
import ProjectsList from '../../components/ProjectsList/ProjectsList';

// Example project data
const sampleProjects = [
    {
        title: 'Torah Code Experiment',
        description: 'Enter a name and it returns an interesting piece of text or logic you designed.',
        image: '/assets/projects/torah.png', // Adjust path if needed
        link: 'http://example.com/torah-project'
    },
    {
        title: 'Project 2',
        description: 'Another interesting project with a brief description here.',
        image: '/assets/anotherImage.png',
        link: 'http://example.com/project-2'
    },
];

const Projects = () => {
    return (
        <div className="projects-container">
            <h1>My Projects</h1>
            <p>
                Showcase your projects here. You might want to list them with images, descriptions, and links.
            </p>

            <ProjectsList projects={sampleProjects} />
        </div>
    );
};

export default Projects;
