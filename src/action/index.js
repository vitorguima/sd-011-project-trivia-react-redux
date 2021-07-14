export const CREATE_USER_EMAIL = 'CREATE_USER_EMAIL';

export const userEmail = (payload) => ({
  type: CREATE_USER_EMAIL,
  payload,
});
