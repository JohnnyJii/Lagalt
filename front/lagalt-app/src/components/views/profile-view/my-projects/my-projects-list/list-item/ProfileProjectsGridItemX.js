import './ProfileProjectsGridItemX.css';
import React from 'react';
import ProfileProjectsModalX from '../project-modal/ProfileProjectsModalX';
import { Card, Badge } from 'react-bootstrap';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import useApplications from '../../../../../../hooks/useApplications';

function ProfileProjectsGridItemX({ project = {}, userId, dbuser }) {
  const [modalShow, setModalShow] = React.useState(false);
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const { id, industry, progress, title, description, gitlink, user: owner, tags, skills } = project;
  const [applications, handleApplication] = useApplications(id, userId, owner);
  const userSkills = JSON.parse(localStorage.getItem('userskills'));
  const matchingSkills = [];

  if (userSkills && skills) {
    for (let i = 0; skills.length > i; i++) {
      for (let j = 0; userSkills.length > j; j++) {
        if (skills[i] === userSkills[j]) {
          matchingSkills.push(skills[i]);
        }
      }
    }
  }


  return (
    <div style={{ margin: '20px', cursor: 'pointer' }}>
      <Card onClick={() => setModalShow(true)}>
        <Card.Header>{industry ? industry : 'Industry'} <small><em>{progress ? progress : 'Progress'}</em></small>{applications.length > 0 && <Badge variant="success">New Applicants!</Badge>}
        </Card.Header>
        <Card.Body>
          <Card.Title>{title ? title : 'Title'}</Card.Title>
          <Card.Text>{description ? description : 'Description'}</Card.Text>
          <Card.Footer>
            {tags.map(tag => (
              <Badge key={tag} variant="primary">
                {tag ? tag : 'Tag'}
              </Badge>
            ))}
            {skills.map(skill => (
              <Badge key={skill} variant="warning">
                {skill ? skill : 'Skill'}
              </Badge>
            ))}
            {matchingSkills.map(matchingSkill => (
              <Badge key={matchingSkill} variant="success">
                {matchingSkills ? matchingSkill : 'Matching Skill'}
              </Badge>
            ))}
          </Card.Footer>
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
        skill={skills}
        tag={tags}
        user={user}
        onHide={() => setModalShow(false)}
        applications={applications}
        handleApplication={handleApplication}
      />
    </div>
  );
}

export default ProfileProjectsGridItemX;

