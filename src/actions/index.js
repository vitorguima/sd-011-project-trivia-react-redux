export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_FAIL = 'REQUEST_QUESTIONS_FAIL';
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const START_COUNTDOWN = 'START_COUNTDOWN';
export const UPDATE_CLOCK = 'UPDATE_CLOCK';

const questionsURL = 'https://opentdb.com/api.php?amount=5&token=';
const tokenURL = 'https://opentdb.com/api_token.php?command=request';

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
  return fetch(tokenURL)
    .then((result) => result.json())
    .then((data) => {
      dispatch(requestTokenSuccess(data));
      localStorage.setItem('token', data.token);
    })
    .catch((error) => dispatch(requestTokenError(error)));
};

const requestQuestions = (payload) => ({
  type: REQUEST_QUESTIONS,
  payload,
});

const requestQuestionsSucces = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

const requestQuestionsFail = (payload) => ({
  type: REQUEST_QUESTIONS_FAIL,
  payload,
});

export const fetchQuestions = (token) => (dispatch) => {
  dispatch(requestQuestions());
  return fetch(`${questionsURL}${token}`)
    .then((result) => result.json())
    .then((data) => dispatch(requestQuestionsSucces(data)))
    .catch((error) => dispatch(requestQuestionsFail(error)));
};

export const startCountdown = () => ({
  type: START_COUNTDOWN,
});

export const updateClock = () => ({
  type: UPDATE_CLOCK,
});
