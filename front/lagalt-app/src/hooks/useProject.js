import axios from 'axios';
import { useState, useEffect } from 'react';
import { PROJECT_URL } from '../utils/serverUrl';

const useProject = function (projectId) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchAndSetProject = async () => {
      const response = await axios.get(PROJECT_URL(projectId));
      setProject(response.data);
    }
    if (projectId !== undefined) {
      fetchAndSetProject()
    }
  }, [projectId])
  return [project]
}

export default useProject;