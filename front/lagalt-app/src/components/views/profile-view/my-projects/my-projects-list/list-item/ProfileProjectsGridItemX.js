import './ProfileProjectsGridItemX.css';
import React from 'react';
import ProfileProjectsModalX from '../project-modal/ProfileProjectsModalX';
import { Card } from 'react-bootstrap';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import useApplications from '../../../../../../hooks/useApplications';

function ProfileProjectsGridItemX({ project = {} }) {
  const [modalShow, setModalShow] = React.useState(false);
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const { id, industry, progress, title, description, gitlink, user: owner } = project;
  const [applications, handleApplication] = useApplications(id, owner);

  return (
    <div style={{ margin: '20px', cursor: 'pointer' }}>
      <Card onClick={() => setModalShow(true)}>
        <Card.Header>{industry ? industry : 'Industry'} <small>{progress ? progress : 'Progress'}</small></Card.Header>
        <Card.Body>
          <Card.Title>{title ? title : 'Title'}</Card.Title>
          <Card.Text>{description ? description : 'Description'}</Card.Text>
          {applications.length > 0 && <p>NEW APPLICATIONS</p>}
        </Card.Body>
      </Card>
      <ProfileProjectsModalX
        id={id}
        industry={industry}
        progress={progress}
        title={title}
        description={description}
        gitlink={gitlink}
        creator={owner}
        show={modalShow}
        user={user}
        onHide={() => setModalShow(false)}
        applications={applications}
        handleApplication={handleApplication}
      />
    </div>
  );
}

export default ProfileProjectsGridItemX;

