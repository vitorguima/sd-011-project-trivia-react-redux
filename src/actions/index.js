export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';

export const setName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const setEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});
