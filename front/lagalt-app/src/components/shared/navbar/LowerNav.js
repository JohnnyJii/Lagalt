import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from 'react-bootstrap'
import './StyleNav.css'


function LowerNav() {
    return (
        <div>
            <Nav text-center fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link className="navLink" href="/home">Main</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navLink" eventKey="link-1">Codes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navLink" eventKey="link-2">Movies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navLink" eventKey="link-3">Music</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="navLink" text-white eventKey="link-4">Other</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default LowerNav;