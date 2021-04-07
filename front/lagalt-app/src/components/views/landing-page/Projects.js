import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import ModalContainer from '../../shared/ModalContainer';
import ProjectInfo from '../../shared/ProjectInformation';
import firebase from 'firebase/app';
import ProjectCommentsX from '../profile-view/my-projects/my-projects-list/message-board/ProjectCommentsX';
import axios from 'axios';
import { APPLY_PROJECT_URL } from '../../../utils/serverUrls/serverUrl';

const Projects = function ({ projects = [] }) {
  return (
    <div>
      { projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export const ProjectCard = function ({ project }) {
  const [modalShow, setModalShow] = useState(false);
  const {
    industry,
    progress,
    title,
    description,
  } = project;

  return (
    <div style={{ margin: '20px', cursor: 'pointer' }}>
      <Card onClick={() => setModalShow(true)}>
        <Card.Header>
          {industry ? industry : 'Industry'}
          {' '}
          <small>{progress ? progress : 'Progress'}</small>
        </Card.Header>
        <Card.Body>
          <Card.Title>{title ? title : 'Title'}</Card.Title>
          <Card.Text>{description ? description : 'Description'}</Card.Text>
        </Card.Body>
      </Card>
      <Project
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
        project={project}
      />
    </div>
  );
};

const Project = function ({ modalShow, onHide, project }) {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const myId = localStorage.getItem('dbuserid');
  const {
    id,
    title,
    description,
    industry,
    progress,
    gitlink,
    user: projectOwnerId
  } = project;

  function applyForProject() {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };
    axios.post(APPLY_PROJECT_URL(id, myId), config)
      .then(() => {
        alert('You have applied to be part of the project. The project owner(s) will answer you shortly.');
      })
      .catch(console.error('Error applying to project'));
  }
  return (
    <ModalContainer
      show={modalShow}
      onHide={onHide}
      title={title}
    >
      <ProjectInfo
        description={description}
        industry={industry}
        progress={progress}
        gitlink={gitlink}
      />
      <hr />
      <div>
        {(user) &&
          <div>
            <small><strong>Message Board</strong></small>
            <ProjectCommentsX projectId={id} />
          </div>
        }
      </div>
      {(projectOwnerId === myId) || (!user) ?
        null
        : <Button onClick={() => applyForProject()}>Apply</Button>
      }
    </ModalContainer>
  );
};


export default Projects;