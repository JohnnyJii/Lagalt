import React from 'react'
import './StyleNav.css'
import { Link } from 'react-router-dom'

function About() {

   // API here!!! modify to read projects and users!!!!

/*   const projects = [
    "jukka",
    "jesse",
    "lauri",
    "nicolas"
  ] */

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = event => {
    setSearchTerm(event.target.value);
 };

 // remove commaent after deployed to landingpage
/*  const results = !searchTerm
    ? projects
    : projects.filter(project =>
        project.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ); */



  // NEED A STATE FOR USERNAME CHANGES!!!!
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/">
          <h1>Lagalt</h1>
        </Link>
      </div>
      <div>
        <input 
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={handleChange}
        />
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