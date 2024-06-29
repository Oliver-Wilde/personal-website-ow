import React from 'react';
import ProjectCard from '../../components/projectcard/ProjectCard';
import './portfolio.css';
import torahimage from '../../assets/projects/torah.png';

const projects = [
    {
        title: 'Torah Code Experiment',
        description: 'Enter a name and you will get an output of known context',
        image: torahimage,
        link: 'http://example.com/project1',
        role: 'Lead Developer',
        teamSize: 'N/A',
        engine: 'Custom',
        responsibilities: [
            'Designed and developed the algorithm',
            'Implemented the front-end interface',
            'Conducted testing and optimization'
        ],
        projectType: 'Project Page'
    },
    {
        title: 'Project 2',
        description: 'Description for project 2',
        image: 'path/to/project2-image.jpg',
        link: 'http://example.com/project2',
        role: 'Software Engineer',
        teamSize: 4,
        engine: 'Unity',
        responsibilities: [
            'Game mechanics design',
            'Level design',
            'Bug fixing and optimization'
        ],
        projectType: 'Store Page'
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
                        role={project.role}
                        teamSize={project.teamSize}
                        engine={project.engine}
                        responsibilities={project.responsibilities}
                        projectType={project.projectType}
                    />
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
