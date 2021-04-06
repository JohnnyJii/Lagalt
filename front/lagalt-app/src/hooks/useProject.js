import axios from 'axios';
import { useState, useEffect } from 'react';
import { PROJECT_URL } from '../utils/serverUrl';

const useProject = function (projectId) {
  const [project, setProject] = useState(null);

  const fetchAndSetProject = async () => {
    const response = await axios.get(PROJECT_URL(projectId));
    setProject(response.data);
  }
  useEffect(() => {
    if (projectId !== undefined) {
      fetchAndSetProject()
    }
  })
  return [project]
}

export default useProject;