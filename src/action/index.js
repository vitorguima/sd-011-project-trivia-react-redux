import getApi from '../service/getToken';

export const CREATE_USER_EMAIL = 'CREATE_USER_EMAIL';
export const CREATE_USER_NAME = 'CREATE_USER_NAME';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

export const userEmail = (payload) => ({
  type: CREATE_USER_EMAIL,
  payload,
});

export const userName = (payload) => ({
  type: CREATE_USER_NAME,
  payload,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenError = (payload) => ({
  type: GET_TOKEN_ERROR,
  payload,
});

/* export function getTokenAction() {
  return (dispatch) => {
    dispatch(getToken());
    return getApi(
      (token).then((payload) => dispatch(getTokenSuccess(payload)),
        (error) => dispatch(getTokenError(error.message))),
    );
  };
} */
