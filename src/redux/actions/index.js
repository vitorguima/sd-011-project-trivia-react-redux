export const ACTION_EMAIL_NOME = 'ACTION_EMAIL_NOME';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR';

export const getMailName = (name, email) => ({
  type: ACTION_EMAIL_NOME,
  name,
  email,
});

const getToken = () => ({
  type: FETCH_TOKEN,
});

const getTokenSuccess = (payload) => ({
  type: FETCH_TOKEN_SUCCESS,
  payload,
});

const getTokenError = (payload) => ({
  type: FETCH_TOKEN_ERROR,
  payload,
});

export const fetchToken = () => (dispatch) => {
  dispatch(getToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((response) => dispatch(getTokenSuccess(response)))
    .catch((error) => dispatch(getTokenError(error)));
};
