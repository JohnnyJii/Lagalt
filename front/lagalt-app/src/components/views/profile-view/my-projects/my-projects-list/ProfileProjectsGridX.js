import ProfileProjectsGridItemX from "./list-item/ProfileProjectsGridItemX";
import React from 'react'

function ProfileProjectsGridX({ projects }) {
    return (
        <div className="container">
            {
                projects.length ?
                    projects.map(project =>
                        <ProfileProjectsGridItemX
                            key={project.id}
                            project={project}
                        />
                    ) :
                    <h1>No projects</h1>
            }
        </div>
    )
}

export default ProfileProjectsGridX