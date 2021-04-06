import React from 'react';
import './StyleNav.css';
import { Link } from 'react-router-dom';

function About(props) {
  return (
    <div className="navbar-container">
      <div className="container">
        <span className="lagalt-logo-text"><Link to="/">Lagalt.no</Link></span>
        <span className="profile-link"><Link to="/profile">{ props.userName && props.userName }</Link></span>
      </div>
    </div>
  );
}

export default About;