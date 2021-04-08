export const authHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
};
