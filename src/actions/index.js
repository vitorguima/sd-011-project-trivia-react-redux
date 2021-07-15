export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API = 'RECEIVE_API';
export const ERROR_API = 'ERROR_API';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_SCORE = 'USER_SCORE';

export const userLogin = (name, gravatarEmail) => ({
  type: USER_LOGIN,
  name,
  gravatarEmail,
});

export const userScore = (score) => ({
  type: USER_SCORE,
  score,
});

function requestApi() {
  return {
    type: REQUEST_API,
  };
}

function receiveApi(payload) {
  return {
    type: RECEIVE_API,
    payload,
  };
}

function errorApi(payload) {
  return {
    type: ERROR_API,
    payload,
  };
}

export const fetchToken = () => (dispatch) => {
  dispatch(requestApi());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((result) => result.json())
    .then((resultJson) => dispatch(receiveApi(resultJson)))
    .catch((error) => dispatch(errorApi(error)));
};
