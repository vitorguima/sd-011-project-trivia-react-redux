const reqQuestions = () => ({ type: 'REQUEST_QUESTIONS' });

const reqToken = () => ({ type: 'REQUEST_TOKEN' });

const getQuestions = (state) => ({ type: 'GET_QUESTIONS', state });

const getToken = (state) => ({ type: 'GET_TOKEN', state });

export const fetchToken = () => {
  return (dispatch) => {
    dispatch(reqToken());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getToken(json)),
          // (error) => dispatch(reqFailed(error)),
        ));
  };
};

export const fetchQuestions = (token) => {
  return (dispatch) => {
    dispatch(reqQuestions());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((r) => r.json()
        .then(
          (json) => dispatch(getQuestions(json)),
          // (error) => dispatch(reqFailed(error)),
        ));
  };
};

export default {
  fetchToken,
  fetchQuestions,
};
