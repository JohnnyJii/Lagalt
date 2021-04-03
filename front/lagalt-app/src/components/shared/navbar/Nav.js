import React from 'react'
import './StyleNav.css'
import firebase from 'firebase/app'

function About() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const user = firebase.auth().currentUser
  const handleChange = event => {
    setSearchTerm(event.target.value);
 };

  return (
    <div className="navbar-container">
        <a href="/">Lagalt</a>
          <input 
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={handleChange}
          />
        <a href="/profile">{ user ? "Profile" : "Login" }</a>
      </div>
  );
}

export default About;