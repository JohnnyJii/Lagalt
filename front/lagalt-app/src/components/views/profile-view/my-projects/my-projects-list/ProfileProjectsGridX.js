import ProfileProjectsGridItemX from './list-item/ProfileProjectsGridItemX';
import React from 'react';

function ProfileProjectsGridX({ userProjects }) {
  return (
    <div className="container">
      {
        userProjects.length ?
          userProjects.map(project =>
            <ProfileProjectsGridItemX
              key={project.id}
              project={project}
            />
          ) :
          <h1>No projects</h1>
      }
    </div>
  );
}

export default ProfileProjectsGridX;