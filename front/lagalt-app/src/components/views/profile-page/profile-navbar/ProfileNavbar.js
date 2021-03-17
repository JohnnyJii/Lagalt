import { Nav } from 'react-bootstrap'

function ProfileNavbar() {
    return(
        <Nav variant="tabs" defaultActiveKey="/profile">
            <Nav.Item>
                <Nav.Link>Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>My Projects</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default ProfileNavbar