import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROJECTS_URL } from '../utils/serverUrls/serverUrl';
import { RECOMMENDED_USER_PROJECTS } from '../utils/serverUrls/userUrls';

const useProjects = function (userId = null) {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async function () {
    const { data } = await axios.get(PROJECTS_URL);
    setProjects(data);
  };

  useEffect(() => {
    const fetchRecommendedProjects = async function () {
      const { data } = await axios.get(RECOMMENDED_USER_PROJECTS(userId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      setProjects(data);
    };
    if (userId) {
      fetchRecommendedProjects();
    } else {
      fetchProjects();
    }
  }, [userId]);

  return [projects];
};

export default useProjects;