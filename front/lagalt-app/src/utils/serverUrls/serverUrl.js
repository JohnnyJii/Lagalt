export const PROJECTS_URL = 'https://lagalt-server.herokuapp.com/api/v1/projects';

export const PROJECT_URL = (projectId) => `${PROJECTS_URL}/${projectId}`;

export const APPLICATIONS_URL = (projectId) => `${PROJECT_URL(projectId)}/applications`;

export const APPLY_PROJECT_URL = (projectId, userId) => `${APPLICATIONS_URL(projectId)}/${userId}`;

export const HANDLE_APPLICATION_URL = (projectId, userId, accept) => (
  `${APPLY_PROJECT_URL(projectId, userId)}/${accept}`
);
