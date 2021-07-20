const reqQuestions = () => ({ type: 'REQUEST_QUESTIONS' });

const reqToken = () => ({ type: 'REQUEST_TOKEN' });

const getQuestions = (state) => ({ type: 'GET_QUESTIONS', state });

const getToken = (state) => ({ type: 'GET_TOKEN', state });

export const user = (state) => ({ type: 'USER', state });

export const addPoint = (state) => ({ type: 'ADD_POINT', state });

export const emptyScore = () => ({ type: 'EMPTY_SCORE' });

export function fetchToken() {
  return (dispatch) => {
    dispatch(reqToken());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getToken(json)),
          // (error) => dispatch(reqFailed(error)),
        ));
  };
}
fetchToken();

export function fetchQuestions(token) {
  return (dispatch) => {
    dispatch(reqQuestions());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((r) => r.json()
        .then(
          (json) => dispatch(getQuestions(json)),
          // (error) => dispatch(reqFailed(error)),
        ));
  };
}

export default {
  fetchToken,
  fetchQuestions,
  addPoint,
};
