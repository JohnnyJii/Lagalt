import React from 'react';
import { useParams } from 'react-router';
import useProject from '../../../hooks/useProject';

const Project = function () {
  const { projectId } = useParams();
  const [project] = useProject(projectId);
  console.log(project);
  return (
    <div style={{ background: 'white' }}>
      <p>poop</p>
    </div>
  );
};

export default Project;