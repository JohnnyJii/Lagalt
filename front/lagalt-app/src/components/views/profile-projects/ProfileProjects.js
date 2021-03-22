import ProfileNavbar from '../profile-page/profile-navbar/ProfileNavbar'
import ProfileProjectsGrid from './profile-projects-grid/ProfileProjectsGrid'
import { Button } from 'react-bootstrap'
import CreateProjectModal from './profile-create-project/CreateProject';
import React from 'react'

function ProfileProjects() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div>
            <ProfileNavbar />
            <Button variant="primary" onClick={() => setModalShow(true)}>Create Project</Button>
            <CreateProjectModal show={modalShow} onHide={() => setModalShow(false)}/>
            <ProfileProjectsGrid />
        </div>
    )
}

export default ProfileProjects