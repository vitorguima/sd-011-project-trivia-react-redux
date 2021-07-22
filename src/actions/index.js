export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_COUNTDOWN = 'RESET_COUNTDOWN';
export const DECREASE_COUNTDOWN = 'DECREASE_COUNTDOWN';

export const getUserInfo = (payload) => ({
  type: GET_USER_INFO,
  payload,
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenFailed = (payload) => ({
  type: GET_TOKEN_FAILED,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  dispatch(getToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const results = await response.json();
    dispatch(getTokenSuccess(results));
  } catch (error) {
    dispatch(getTokenFailed(error));
  }
};

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

export const getQuestionsFailed = (payload) => ({
  type: GET_QUESTIONS_FAILED,
  payload,
});

export const getQuestionsThunk = (token) => async (dispatch) => {
  dispatch(getQuestions());
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const results = await response.json();
    dispatch(getQuestionsSuccess(results));
  } catch (error) {
    dispatch(getQuestionsFailed(error));
  }
};

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const resetCountdown = () => ({
  type: RESET_COUNTDOWN,
});

export const decreaseCountdown = () => ({
  type: DECREASE_COUNTDOWN,
});
