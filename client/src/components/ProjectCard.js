import React from 'react'

const ProjectCard = props => {
    return (
        <div className="projectcard">
            <h3>Project name: {props.project.name}</h3>
            <h4>Project description: {props.project.name}</h4>
            <h4>Project id: {props.project.id}</h4>
        </div>
    )
}
export default ProjectCard;