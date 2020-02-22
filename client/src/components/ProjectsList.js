import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProjectCard from './ProjectCard'

const ProjectsList = function () {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/projects`)
            .then(response => {
                console.log(response.data)
                setProjects(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className='projectslist'>
            {projects.map((project, key) => {
                return (
                    <ProjectCard
                        project={project}
                        key={key}
                    />
                );
            })}
        </div>
    )
}
export default ProjectsList