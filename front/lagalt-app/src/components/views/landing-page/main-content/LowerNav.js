import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from 'react-bootstrap'
import './LowerNav.css'

function LowerNav() {
    return (
        <div>
            <Nav text-center="true" fill variant="tabs" defaultActiveKey="all">
                <Nav.Item>
                    <Link to="/">All </Link>
                </Nav.Item>
                <Nav.Item>
                <Link to="/codes"> Programming </Link>
                </Nav.Item>
                <Nav.Item>
                <Link to="/movies"> Movies </Link>
                </Nav.Item>
                <Nav.Item>
                <Link to="/music"> Music </Link>
                </Nav.Item>
                <Nav.Item>
                <Link to="/web"> Web  development </Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default LowerNav;