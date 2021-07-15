export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_FAIL = 'REQUEST_QUESTIONS_FAIL';

const questionsURL = 'https://opentdb.com/api.php?amount=5&token=';

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
