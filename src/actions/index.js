import { getToken } from '../services/API';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SUCESS = 'SUCESS';
export const FAIL = 'SUCESS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_FAILED = 'REQUEST_QUESTIONS_FAILED';

/* export const loading = (payload) => ({
  type: LOADING,
  payload,
}); */

export const success = (payload) => ({
  type: SUCESS,
  payload,
});

/* export const fail = (payload) => ({
  type: FAIL,
  payload,
});
 */
export const thunkToken = () => async (dispatch) => {
  const callGetToken = await getToken();
  dispatch(success(callGetToken));
};
// ============================================================

export const requestQuestionsSuccess = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

export const requestQuestionsFailed = (payload) => ({
  type: REQUEST_QUESTIONS_FAILED,
  payload,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const getFetch = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).json();
  dispatch(requestQuestionsSuccess(getFetch));
};
