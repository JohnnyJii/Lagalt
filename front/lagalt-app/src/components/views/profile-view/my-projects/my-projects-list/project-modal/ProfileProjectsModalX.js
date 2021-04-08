import React, { useState } from 'react';
import { Modal, Button, Card, Badge } from 'react-bootstrap';
import ProjectCommentsX from '../message-board/ProjectCommentsX';
import axios from 'axios';
import Applications from './Applications';
import { APPLY_PROJECT_URL } from '../../../../../../utils/serverUrls/serverUrl';

function ProfileProjectsModalX(props) {
  const myId = localStorage.getItem('dbuserid');
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
        : <ApplyModal projectId={props.id} userId={myId} />
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

const ApplyModal = function ({ projectId, userId }) {
  const [modalShow, setModalShow] = useState(false);

  function applyForProject(requestBody) {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };

    axios.post(APPLY_PROJECT_URL(projectId, userId), requestBody, config);
    //alert('You have applied to be part of the project. The project owner(s) will answer you shortly.');

    setModalShow(false);
  }
  return (
    <div className="ApplyModal">
      <Card onClick={() => setModalShow(true)}>
        <Card.Body>
          <Button onClick={() => setModalShow(true)}>Apply</Button>
        </Card.Body>
      </Card>
      <ModalContainer
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Applications"
      >
        <ApplyForm apply={applyForProject} />
      </ModalContainer>
    </div>
  );
};

const ApplyForm = function ({ apply }) {
  const [motivationLetter, setLetter] = useState('');

  const handleSubmit = function (e) {
    e.preventDefault();
    apply({ motivationLetter });
  };

  return (
    <form onSubmit={handleSubmit}>
      Motivation letter :
      <br />
      <textarea style={{ width: '100%' }}
        value={motivationLetter}
        onChange={(e) => setLetter(e.target.value)}
      />
      <Button type="submit">Apply</Button>
      <p>Note! Project owner will see your information (such as name, email, description and skills)</p>
    </form>
  );
};

export default ProfileProjectsModalX;