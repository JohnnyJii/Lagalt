export const USER_URL = (userId) => `${USERS_URL}/${userId}`;

export const USERS_URL = 'https://lagalt-server.herokuapp.com/api/v1/users';

export const USERS_PROJECTS_URL = (userId) => `${USER_URL(userId)}/projects`;

export const USER_BY_GOOGLE_ID = (googleId) => `${USERS_URL}/googleid/${googleId}`;