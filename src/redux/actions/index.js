export const ACTION_EMAIL_NOME = 'ACTION_EMAIL_NOME';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR';
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';

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

const getQuestion = () => ({
  type: FETCH_QUESTION,
});

const getQuestionSuccess = (payload) => ({
  type: FETCH_QUESTION_SUCCESS,
  payload,
});

const getQuestionError = (payload) => ({
  type: FETCH_QUESTION_ERROR,
  payload,
});

export const fetchToken = () => (dispatch) => {
  dispatch(getToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((response) => dispatch(getTokenSuccess(response)))
    .catch((error) => dispatch(getTokenError(error)));
};

export const fetchQuestion = (token) => (dispatch) => {
  dispatch(getQuestion());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((res) => dispatch(getQuestionSuccess(res)))
    .catch((err) => dispatch(getQuestionError(err)));
};
