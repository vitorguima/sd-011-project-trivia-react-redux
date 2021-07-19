export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';

function InfoPlayer(name, email) {
  const state = { player: {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
  },
  };
  localStorage.setItem('state', JSON.stringify(state));
  return {
    type: 'PLAYER_INFO',
    name,
    email,
  };
}

export default InfoPlayer;

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

export const fetchToken = () => (dispatch) => {
  dispatch(requestToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((result) => result.json())
    .then((data) => {
      localStorage.setItem('token', data.token);
      dispatch(requestTokenSuccess(data));
    })
    .catch((error) => dispatch(requestTokenError(error)));
};

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const requestQuestionsSuccess = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

const requestQuestionsError = (payload) => ({
  type: REQUEST_QUESTIONS_ERROR,
  payload,
});

export const fetchQuestions = (token) => (dispatch) => {
  dispatch(requestQuestions());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((result) => result.json())
    .then((data) => dispatch(requestQuestionsSuccess(data)))
    .catch((error) => dispatch(requestQuestionsError(error)));
};
