import axios from 'axios';
import { useEffect, useState } from 'react';
import { APPLICATIONS_URL, HANDLE_APPLICATION_URL } from '../utils/serverUrls/serverUrl';
import { authHeader } from './hookHelper';

function useApplications(projectId, userId, projectOwnerId) {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const fetchAndSetApplications = async () => {
      const { data } = await axios.get(APPLICATIONS_URL(projectId), authHeader);
      setApplications(data);
    };
    if ((projectId !== undefined) && ('' + userId === projectOwnerId)) {
      fetchAndSetApplications();
    }
  }, [projectId, userId, projectOwnerId]);

  const handleApplication = async function (projectId, userId, accept) {
    await axios.post(HANDLE_APPLICATION_URL(projectId, userId, accept), null, authHeader);
    setApplications(applications.filter(application => {
      if (application.userId === userId && application.projectId === projectId) {
        return false;
      }
      return true;
    }));
  };
  return [applications, handleApplication];
}

export default useApplications;