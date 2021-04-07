import ProfileProjectsGridItemX from './list-item/ProfileProjectsGridItemX';
import React from 'react';

function ProfileProjectsGridX({ userProjects = [], projectPartOf = [] }) {
  return (
    <div className="container">
      <h1 style={{ color: 'white' }}>Own projects</h1>
      <ProjectList projects={userProjects} />
      <h1 style={{ color: 'white' }}>Projects part of</h1>
      <ProjectList projects={projectPartOf} />
    </div >
  );
}

const ProjectList = function ({ projects }) {
  return (
    <div>
      {
        projects.length ?
          projects.map(project =>
            <ProfileProjectsGridItemX
              key={project.id}
              project={project}
            />
          ) :
          <h4 style={{ color: 'white' }}>No projects found</h4>
      }
    </div>
  );
};

export default ProfileProjectsGridX;