export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_QUESTIONS_SUCCESS = 'SAVE_QUESTIONS_SUCCESS';
export const SAVE_QUESTIONS_ERROR = 'SAVE_QUESTIONS_ERROR';

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const saveQuestionsSuccess = (payload) => ({
  type: SAVE_QUESTIONS_SUCCESS,
  payload,
});

export const saveQuestionsError = (payload) => ({
  type: SAVE_QUESTIONS_ERROR,
  payload,
});

// export const fetchQuestions = (token) => (dispatch) => {
//   dispatch(saveQuestions());
//   return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
//     .then((response) => response.json())
//     .then((data) => dispatch(saveQuestionsSuccess(data)))
//     .catch((error) => dispatch(saveQuestionsError(error)));
// };

// export const fetchQuestions = (token) => async (dispatch) => {
//   dispatch(saveQuestions());
//   try {
//     const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//     const data = await response.json();
//     return dispatch(saveQuestionsSuccess(data.results));
//   } catch (error) {
//     return dispatch(saveQuestionsError(error));
//   }
// };
