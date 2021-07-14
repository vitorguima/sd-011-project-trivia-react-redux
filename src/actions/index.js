export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const loginAction = (email, name) => ({ type: LOGIN, email, name });

const receiveToken = (token) => ({ type: TOKEN, token });

export const fetchToken = () => (dispatch) => (fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((token) => dispatch(receiveToken(token))));
