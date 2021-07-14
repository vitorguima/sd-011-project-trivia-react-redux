export const LOGIN = 'LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const requestToken = (payload) => ({
  type: REQUEST_TOKEN,
  payload,
});

export const requestTokenSuccess = (payload) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload,
});

export const requestTokenError = (payload) => ({
  type: REQUEST_TOKEN_ERROR,
  payload,
});

export const fetchToken = () => (dispatch) => {
  dispatch(requestToken);
  return (fetch('https://opentdb.com/api_token.php?command=request'))
    .then((response) => response.json())
    .then((result) => dispatch(requestTokenSuccess(result)))
    .catch((error) => dispatch(requestTokenError(error)));
};
