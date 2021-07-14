export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  dispatch(receiveQuestions(result));
};
