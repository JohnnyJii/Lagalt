import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROJECTS_URL } from '../utils/serverUrls/serverUrl';
import { USERS_PROJECTS_URL } from '../utils/serverUrls/userUrls';
import { authHeader } from './hookHelper';

const useUserProjects = function (userId) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAndSetUserProjects = async function () {
      const response = await axios.get(USERS_PROJECTS_URL(userId), authHeader);
      setProjects(response.data);
    };
    if (userId !== undefined) {
      fetchAndSetUserProjects();
    }
  }, [userId]);

  const addProject = function (projectToAdd) {
    const newProject = {
      ...projectToAdd
    };
    axios.post(PROJECTS_URL, newProject, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(({ data }) => {
        console.log('new project data', { data });
        setProjects(projects.concat(data));
        alert('Created a new project successfully!');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return [projects, addProject];
};

export default useUserProjects;