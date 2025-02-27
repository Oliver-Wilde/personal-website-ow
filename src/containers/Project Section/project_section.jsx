import React from 'react';
import './project_section.css';
import projects from '../../data/projects';
import ProjectsList from '../../components/projectsList/ProjectsList';

const Project_section = () => {
    return (
        <div className="ow_project-section" id="experience">
            <div className="ow_project-section-heading">
                <h2>Experience & Projects</h2>
                <p>Check out some of my recent work</p>
            </div>

            {/* Featured Projects */}
            <div className="ow_project-section-featured">
                <h3>Featured Projects</h3>
                <ProjectsList
                    projects={projects}
                    filter={project => project.featured}
                />
            </div>

            {/* All Projects */}
            <div className="ow_project-section-all">
                <h3>All Projects</h3>
                <ProjectsList projects={projects} />
            </div>
        </div>
    );
};

export default Project_section;
