import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProfileNavbar() {
    return(
        <Nav variant="tabs" defaultActiveKey="/profile">
            <Nav.Item>
                <Nav.Link>
                    <Link to="/profile">Profile</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>
                    <Link to="/projects">My Projects</Link>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default ProfileNavbar