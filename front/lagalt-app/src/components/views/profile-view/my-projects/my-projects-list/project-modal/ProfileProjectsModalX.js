import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import ProjectCommentsX from '../message-board/ProjectCommentsX';
import axios from 'axios';
import Applications from './Applications';
import { APPLY_PROJECT_URL } from '../../../../../../utils/serverUrls/serverUrl';

function ProfileProjectsModalX(props) {
  const myId = localStorage.getItem('dbuserid');
  // TODO move from Profile projects to projects
  function applyForProject() {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };
    axios.post(APPLY_PROJECT_URL(props.id, myId), {}, config);
    alert('You have applied to be part of the project. The project owner(s) will answer you shortly.');
  }

  return (
    <ModalContainer
      show={props.show}
      onHide={props.onHide}
      title={props.title}
    >
      <ProjectInfo {...props} />
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
      {(props.creator === myId) || (!props.user) ?
        null
        : <Button onClick={() => applyForProject()}>Apply</Button>
      }
    </ModalContainer>
  );
}

const ModalContainer = function ({ title = '', show, onHide, children }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title ? title : 'Title'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ProjectInfo = function ({
  description = '',
  industry = '',
  progress = '',
  gitlink = '',
  tag = '',
  skill = ''
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
      <br />
      {tag.map(tag => (
        <Badge variant="primary">
          {tag ? tag : 'Tag'}
        </Badge>
      ))}
      {skill.map(skill => (
        <Badge variant="warning">
          {skill ? skill : 'Skill'}
        </Badge>
      ))}
    </div>
  );
};

export default ProfileProjectsModalX;