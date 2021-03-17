import ProfileNavbar from '../profile-page/profile-navbar/ProfileNavbar'
import ProfileProjectsGrid from './profile-projects-grid/ProfileProjectsGrid'
import { Button } from 'react-bootstrap'

function ProfileProjects() {
    return (
        <div>
            <ProfileNavbar />
            <Button variant="success">Create Project</Button>
            <ProfileProjectsGrid />
        </div>
    )
}

export default ProfileProjects