import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LowerNav.css';

function LowerNav() {
  return (
    <div>
      <Nav text-center="true" fill variant="tabs" defaultActiveKey="all">
        <Nav.Item>
          <Link to="/">All</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/gamedevelopment">Game Development</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/films">Film</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/music">Music</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/webdevelopment">Web Development</Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default LowerNav;