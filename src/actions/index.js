export const GET_EMAIL = 'GET_EMAIL';
export const GET_NAME = 'GET_NAME';

export const getEmail = (email) => ({ type: 'GET_EMAIL', email });
export const getName = (name) => ({ type: 'GET_NAME', name });
