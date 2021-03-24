import React from 'react'
import './StyleNav.css'
import { Link } from 'react-router-dom'

function About() {
  // NEED A STATE FOR USERNAME CHANGES!!!!
  let userName = localStorage.getItem('userName')
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/">
          <h1>Lagalt</h1>
        </Link>
      </div>
      <div className="navbar-right">
        { userName ? 
          <Link to="/profile">
            <p>Profile</p>
          </Link>
          : ''
      }
      { userName ? '' :
        <Link to="login">
          <p>Log In</p>
        </Link>
      }
      </div>
    </div>
  );
}

export default About;