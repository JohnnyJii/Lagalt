export const PROJECTS_URL = 'https://lagalt-server.herokuapp.com/api/v1/projects';

export const PROJECT_URL = (projectId) => `${PROJECTS_URL}/${projectId}`;

export const USERS_PROJECTS_URL = (userId) => `${USER_URL(userId)}/projects`;

export const USER_URL = (userId) => `${USERS_URL}/${userId}`;

export const USERS_URL = 'https://lagalt-server.herokuapp.com/api/v1/users';

export const APPLICATIONS_URL = (projectId) => `${PROJECT_URL(projectId)}/applications`;

export const APPLY_PROJECT_URL = (projectId, userId) => `${APPLICATIONS_URL(projectId)}/${userId}`;

export const HANDLE_APPLICATION_URL = (projectId, userId, accept) => (
  `${APPLY_PROJECT_URL(projectId, userId)}/${accept}`
);