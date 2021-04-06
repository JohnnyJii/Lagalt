import axios from "axios";
import { useEffect, useState } from "react";
import { USERS_PROJECTS_URL } from "../utils/serverUrl";

const useUserProjects = function (userId) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAndSetUserProjects = async function () {
      const response = await axios.get(USERS_PROJECTS_URL(userId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      setProjects(response.data);
    }
    if (userId !== undefined) {
      fetchAndSetUserProjects();
    }
  }, [userId, projects])

  const addProject = function (projectToAdd) {
    setProjects(projects.concat(projectToAdd));
  }

  return [projects, addProject];
}

export default useUserProjects;