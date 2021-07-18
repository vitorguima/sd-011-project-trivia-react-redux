export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const FAILED_TOKEN_REQUEST = 'FAILED_TOKEN_REQUEST';
export const GET_TOKEN = 'GET_TOKEN';
export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const FAILED_QUESTIONS_REQUEST = 'FAILED_QUESTIONS_REQUEST';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const questionsRequest = () => ({
  type: QUESTIONS_REQUEST,
});

export const failedQuestionsRequest = (error) => ({
  type: FAILED_QUESTIONS_REQUEST,
  error,
});

export const getQuestions = (json) => ({
  type: GET_QUESTIONS,
  json,
});

export const fetchApiQuestions = (token) => async (dispatch) => {
  await dispatch(questionsRequest());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then(
      (json) => dispatch(getQuestions(json)),
      (error) => dispatch(failedQuestionsRequest(error)),
    );
};

export const tokenRequest = () => ({
  type: TOKEN_REQUEST,
});

export const failedTokenRequest = (error) => ({
  type: FAILED_TOKEN_REQUEST,
  error,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const fetchApiToken = () => async (dispatch) => {
  await dispatch(tokenRequest());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then(
      (json) => {
        localStorage.setItem('token', json.token);
        dispatch(getToken(json));
        dispatch(fetchApiQuestions(json.token));
      },
      (error) => dispatch(failedTokenRequest(error)),
    );
};
