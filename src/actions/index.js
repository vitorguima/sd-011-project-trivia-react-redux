export const CREATE_USER_EMAIL = 'CREATE_USER_EMAIL';
export const CREATE_USER_NAME = 'CREATE_USER_NAME';
export const CREATE_USER_HASH = 'CREATE_USER_HASH';
// export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
// export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

export const createUserEmail = (email) => ({
  type: CREATE_USER_EMAIL,
  payload: email,
});

export const createUserName = (name) => ({
  type: CREATE_USER_NAME,
  payload: name,
});

export const createUserHash = (hash) => ({
  type: CREATE_USER_HASH,
  payload: hash,
});

// export const getTokenSuccess = (payload) => ({
//   type: GET_TOKEN_SUCCESS,
//   payload,
// });

// export const getTokenError = (payload) => ({
//   type: GET_TOKEN_ERROR,
//   payload,
// });
