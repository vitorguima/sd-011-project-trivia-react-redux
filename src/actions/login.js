import { fetchToken } from '../services/API';

export const LOGIN = 'LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const GRAVATAR_IMAGE = 'GRAVATAR_IMAGE';

export const login = (infos) => ({
  type: LOGIN,
  infos,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenSuccess = (payload) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload,
});

const requestTokenError = (payload) => ({
  type: REQUEST_TOKEN_ERROR,
  payload,
});

export const fetchTokenAPI = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const response = await fetchToken();
    dispatch(requestTokenSuccess(response));
  } catch (error) {
    dispatch(requestTokenError(error));
  }
};

export const gravatarImage = (payload) => ({
  type: GRAVATAR_IMAGE,
  payload,
});
