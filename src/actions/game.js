import { fetchQuestions } from '../services/API';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_PLAYER_INFO = 'RESET_PLAYER_INFO';

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const requestQuestionsSuccess = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

export const requestQuestionsError = (payload) => ({
  type: REQUEST_QUESTIONS_ERROR,
  payload,
});

export const fetchQuestionsAPI = (token,
  questionCategory,
  questionDifficulty,
  questionType) => async (dispatch) => {
  dispatch(requestQuestions());
  try {
    const response = await fetchQuestions(token,
      questionCategory,
      questionDifficulty,
      questionType);
    dispatch(requestQuestionsSuccess(response));
  } catch (error) {
    dispatch(requestQuestionsError(error));
  }
};

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const resetPlayerInfo = () => ({
  type: RESET_PLAYER_INFO,
});
