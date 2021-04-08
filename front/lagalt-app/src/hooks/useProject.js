import axios from 'axios';
import { useState, useEffect } from 'react';
import { PROJECT_URL } from '../utils/serverUrls/serverUrl';

const useProject = function (projectId) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchAndSetProject = async () => {
      const response = await axios.get(PROJECT_URL(projectId));
      setProject(response.data);
    };
    if (projectId !== undefined) {
      fetchAndSetProject();
    }
  }, [projectId]);

  const updateProject = async function (newProject) {
    const parseProject = {
      ...newProject,
      user: {
        id: newProject.user
      }
    };
    await axios.put(PROJECT_URL(projectId), parseProject, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    setProject(newProject);
  };

  return [project, updateProject];
};

export default useProject;