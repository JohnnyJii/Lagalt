import React from 'react';

const ProjectInfo = function ({
  description = '',
  industry = '',
  progress = '',
  gitlink = ''
}) {
  return (
    <div>
      <small><strong>Project Description</strong></small>
      <p>{description && description}</p>
      <small><strong>Project Info</strong></small>
      <br />
      {industry &&
        <small><strong>Industry:</strong>{industry}</small>
      }
      <br />
      {/* owner info not part of the project. Only owner id
        <small><strong>Owner:</strong> {creator ? creator : 'User'}</small>
      <br />
      */}
      {progress &&
        <small><strong>Progress:</strong> {progress}</small>
      }
      < br />
      {gitlink &&
        <small>
          <strong>Git Link:</strong>
          <a href={gitlink} target="blank_">{gitlink}</a>
        </small>
      }
    </div>
  );
};

export default ProjectInfo;