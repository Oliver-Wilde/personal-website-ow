import React from 'react';
import ProjectCard from '../../components/projectcard/ProjectCard';
import './portfolio.css';
import torahimage from '../../assets/projects/torah.png';

const projects = [
    {
        title: 'Torah Code Experiment',
        description: 'Enter a name and you will get an output of known context',
        image: torahimage,
        link: 'http://example.com/project1'
    },
    {
        title: 'Project 2',
        description: 'Description for project 2',
        image: 'path/to/project2-image.jpg',
        link: 'http://example.com/project2'
    },
    // Add more projects here
];

const Portfolio = () => {
    return (
        <div className="portfolio-section">
            <h2 className="portfolio-title">My Projects</h2>
            <div className="portfolio-grid">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        link={project.link}
                    />
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
