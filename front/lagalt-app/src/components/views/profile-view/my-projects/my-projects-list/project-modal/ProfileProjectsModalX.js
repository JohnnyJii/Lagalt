import React from 'react';
import ProjectCommentsX from '../message-board/ProjectCommentsX';
import Applications from './Applications';
import ModalContainer from '../../../../../shared/ModalContainer';
import ProjectInfo from '../../../../../shared/ProjectInformation';

function ProfileProjectsModalX(props) {
  return (
    <ModalContainer
      show={props.show}
      onHide={props.onHide}
      title={props.title}
    >
      <ProjectInfo
        description={props.description}
        industry={props.industry}
        progress={props.progress}
        gitlink={props.gitlink}
      />
      <hr />
      <Applications
        applications={props.applications}
        handleApplication={props.handleApplication}
      />
      <div>
        {(props.user) &&
          <div>
            <small><strong>Message Board</strong></small>
            <ProjectCommentsX projectId={props.id} />
          </div>
        }
      </div>
    </ModalContainer>
  );
}

export default ProfileProjectsModalX;