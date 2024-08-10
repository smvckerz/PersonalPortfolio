import React from 'react';

function Projects() {
    const projects = [
        {
            name: "Project 1",
            description: "Description of project 1",
            link: "https://github.com/yourusername/project1"
        },
        {
            name: "Project 2",
            description: "Description of project 2",
            link: "https://github.com/yourusername/project2"
        },
        // Add more projects as needed
    ];

    return (
        <section id="projects" className="section-projects">
            <h2>My Projects</h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Projects;
