import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ProjectCommentsX from '../message-board/ProjectCommentsX';
import axios from 'axios';
import Applications from './Applications';
import { APPLY_PROJECT_URL } from '../../../../../../utils/serverUrls/serverUrl';

function ProfileProjectsModalX(props) {
  const myId = localStorage.getItem('dbuserid');

  function applyForProject() {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };
    axios.post(APPLY_PROJECT_URL(props.id, myId), config);
    alert('You have applied to be part of the project. The project owner(s) will answer you shortly.');
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title ? props.title : 'Title'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProjectInfo {...props} />
        <hr />
        <Applications projectId={props.id} />
        <div>
          {(props.user) ?
            <div>
              <small><strong>Message Board</strong></small>
              <ProjectCommentsX projectId={props.id} />
            </div>
            : ''
          }
        </div>
        {(props.creator === myId) || (!props.guser) ?
          null
          : <Button onClick={() => applyForProject()}>Apply</Button>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ProjectInfo = function (props) {
  return (
    <div>
      <small><strong>Project Description</strong></small>
      <p>{props.description ? props.description : 'Description'}</p>
      <small><strong>Project Info</strong></small>
      <br />
      <small><strong>Industry:</strong> {props.industry ? props.industry : 'Industry'}</small>
      <br />
      <small><strong>Owner:</strong> {props.creator ? props.creator : 'User'}</small>
      <br />
      {props.progress ?
        <small><strong>Progress:</strong> {props.progress}</small>
        : null
      }
      < br />
      {
        props.gitlink ?
          <small>
            <strong>Git Link:</strong>
            <a href={props.gitlink} target="blank_">{props.gitlink}</a>
          </small> :
          null
      }
    </div>
  );
};

export default ProfileProjectsModalX;