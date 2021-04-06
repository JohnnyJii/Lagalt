import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProfileNavbarX() {
  return(
    <div>
      <Nav text-center="true" fill variant="tabs" defaultActiveKey="profile">
        <Nav.Item>
          <Nav.Link className="navLink" eventKey="profile" as={Link} to="/profile">
                        Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navLink" eventKey="projects" as={Link} to="/projects">
                        Projects
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default ProfileNavbarX;