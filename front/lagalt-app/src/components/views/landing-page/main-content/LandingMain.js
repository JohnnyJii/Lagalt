import React from 'react';
import { useParams } from 'react-router';
import useProjects from '../../../../hooks/useProjects';
import '../Landing.css';
import SearchBar from '../search-bar/SearchBar';

function LandingMain() {
  const { filter } = useParams();
  const [projects] = useProjects();

  const filterByIndustry = ({ industry }) => {
    if (!filter) {
      return true;
    }
    if (industry.toLowerCase() === filter) {
      return true;
    }
    return false;
  };

  const filteredArrays = projects.filter(filterByIndustry);

  return (
    <div className="landing-main">
      <SearchBar projects={filteredArrays} />
    </div>
  );
}

export default LandingMain;