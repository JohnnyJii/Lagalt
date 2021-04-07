import React, { useState } from 'react';
import './SearchBar.css';
import ProfileProjectsGridItemX from '../../profile-view/my-projects/my-projects-list/list-item/ProfileProjectsGridItemX';
import { ProjectCard } from '../Projects';

function SearchBar({ projects }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filterByTitle = ({ title }) => {
    if (searchTerm === '') {
      return true;
    }
    if (title.toLowerCase().includes(searchTerm)) {
      return true;
    }
    return false;
  };

  const filteredArray = projects.filter(filterByTitle);

  return (
    <div className="searchBar">
      <SearchInput setSearchTerm={setSearchTerm} />
      {filteredArray.length ?
        <ProjectList projects={filteredArray} />
        :
        <h1 style={{ color: 'white' }}>
          No results. Try different search term
        </h1>
      }
    </div>
  );
};

const SearchInput = function ({ setSearchTerm }) {
  return (
    <input
      type="text"
      className="search-bar-input"
      placeholder="Search for projects"
      onChange={event => { setSearchTerm(event.target.value.toLowerCase()); }}
    />
  );
};

const ProjectList = function ({ projects }) {
  return (
    projects.map((project) => (
      <div className="container" key={project.id}>
        <ProjectCard
          project={project}
        />
      </div>
    ))
  );
};

export default SearchBar;