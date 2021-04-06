import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROJECTS_URL } from '../utils/serverUrl';

const useProjects = function () {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async function () {
      const { data } = await axios.get(PROJECTS_URL);
      console.log({ data }, PROJECTS_URL);
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return [projects];
};

export default useProjects;