import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LowerNav.css';
import useProjects from '../../../../hooks/useProjects';

function LowerNav() {
  const [projects] = useProjects();

  const filterDublicates = (industry, index, array) => (
    array.findIndex((i) => i === industry) === index
  );

  const industries = projects
    .map(project => project.industry.toLowerCase())
    .filter(filterDublicates);

  const title = (input) => {
    const words = input.split(' ');
    return words
      .map(wordToTitle)
      .join(' ');
  };

  const wordToTitle = (input) => {
    const [first, ...rest] = input;
    return [first.toUpperCase(), ...rest].join('');
  };

  return (
    <div>
      <Nav text-center="true" fill variant="tabs" defaultActiveKey="all">
        <Nav.Item>
          <Link to="/">All</Link>
        </Nav.Item>
        {industries.map(industry => (
          <Nav.Item key={industry}>
            <Link to={`/projects/${industry}`}>{title(industry)}</Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export default LowerNav;