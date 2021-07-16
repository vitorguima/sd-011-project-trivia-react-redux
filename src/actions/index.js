export const GET_LOGIN = 'GET_LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

export const actionLogin = (name, gravatarEmail) => ({
  type: GET_LOGIN,
  name,
  gravatarEmail,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receiveToken = (payload) => ({
  type: RECEIVE_TOKEN,
  payload,
});

export const actionScore = (score) => ({
  type: GET_SCORE,
  score,
});

export const getAssertions = (score) => ({
  type: GET_ASSERTIONS,
  score,
});

export function fetchToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  return (dispatch) => {
    dispatch(requestToken());
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return dispatch(receiveToken(data));
      });
  };
}
