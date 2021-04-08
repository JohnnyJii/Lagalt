import ProfileProjectsGridItemX from './list-item/ProfileProjectsGridItemX';
import React from 'react';
import useProjectsPartOf from '../../../../../hooks/useProjectsPartOf';

function ProfileProjectsGridX({ userProjects, userId }) {
  const [projectsPartOf] = useProjectsPartOf(userId);

  return (
    <div className="container">
      <h1 style={{ color: 'white' }}>Own projects</h1>
      <ProjectList projects={userProjects} userId={userId} />
      <h1 style={{ color: 'white' }}>Projects part of</h1>
      <ProjectList projects={projectsPartOf} />
      <br />
    </div >
  );
}

const ProjectList = function ({ projects = [], userId }) {
  return (
    <div>
      {
        projects.length ?
          projects.map(project =>
            <ProfileProjectsGridItemX
              key={project.id}
              project={project}
              userId={userId}
            />
          ) :
          <h4 style={{ color: 'white' }}>No projects found</h4>
      }
    </div>
  );
};

export default ProfileProjectsGridX;