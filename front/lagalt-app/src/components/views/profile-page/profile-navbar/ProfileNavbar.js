import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProfileNavbar() {
    return(
        <Nav variant="tabs" defaultActiveKey="/profile">
            <Nav.Item>
                    <Link to="/profile">Profile</Link>
            </Nav.Item>
            <Nav.Item>
                    <Link to="/projects">My Projects</Link>
            </Nav.Item>
        </Nav>
    )
}

export default ProfileNavbar