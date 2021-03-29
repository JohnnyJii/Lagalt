import React from 'react'
import Search from './Search';
import './StyleNav.css'


function About() {


  // NEED A STATE FOR USERNAME CHANGES!!!!
  return (
    <div className="navbar-container">
        <a href="/">Lagalt</a>
          <Search />
        <a href="/profile">Profile / Login</a>
      </div>
  );
}

export default About;