import React from 'react'
import './StyleNav.css'
import { Link } from 'react-router-dom'

function About() {
  // NEED A STATE FOR USERNAME CHANGES!!!!
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/">
          <h1>Lagalt</h1>
        </Link>
      </div>
      <div className="navbar-right">
          <Link to="/profile">
            <p>Profile / Login</p>
          </Link>
      </div>
    </div>
  );
}

export default About;