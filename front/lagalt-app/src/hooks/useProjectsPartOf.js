import axios from 'axios';
import { useState, useEffect } from 'react';
import { USER_PROJECTS_PARTICIPANT } from '../utils/serverUrls/userUrls';
import { authHeader } from './hookHelper';

const useProjectsPartOf = function (userId) {
  const [projectsPartOf, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async function () {
      const { data } = await axios.get(USER_PROJECTS_PARTICIPANT(userId), authHeader);
      setProjects(data);
    };
    if (userId !== undefined) {
      fetchProjects();
    }
  }, [userId]);
  return [projectsPartOf];
};

export default useProjectsPartOf;
