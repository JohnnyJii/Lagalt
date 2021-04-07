import ProfileProjectsGridX from './my-projects-list/ProfileProjectsGridX';
import CreateProjectX from './create-project/CreateProjectX';
import { Button } from 'react-bootstrap';
import React from 'react';
import useUserProjects from '../../../../hooks/useUserProjects';

function ProfileProjectsX(props) {
  const dbuserid = props.dbuser.id;
  const [projects, addProject] = useUserProjects(dbuserid);
  return (
    <div>
      <NewProjectContainer
        dbuserid={dbuserid}
        addProject={addProject}
      />
      <ProfileProjectsGridX
        projects={projects}
      />
    </div>
  );
}

const NewProjectContainer = function ({ dbuserid, addProject }) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div style={{ textAlign: 'center' }}>
      <CreateProjectX
        show={modalShow}
        onHide={() => setModalShow(false)}
        dbuserid={dbuserid}
        addProject={addProject} />
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}>
        Create Project
      </Button>
    </div>
  );
};

export default ProfileProjectsX;
