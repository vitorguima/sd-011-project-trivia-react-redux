export const SAVE_LOGIN = 'SAVE_LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';

export const saveLogin = (email, name) => {
  const state = {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  };
  localStorage.setItem('state', JSON.stringify(state));
  return {
    type: SAVE_LOGIN,
    email,
    name,
  };
};

export const requestToken = () => ({
  type: REQUEST_TOKEN,
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
  dispatch(requestToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((result) => result.json())
    .then((data) => {
      dispatch(requestTokenSuccess(data));
      localStorage.setItem('token', data.token);
    })
    .catch((error) => dispatch(requestTokenError(error)));
};
