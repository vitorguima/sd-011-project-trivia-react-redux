export const requestQuestionsSuccess = (payload) => ({
  type: 'REQUEST_QUESTIONS_SUCCESS',
  payload,
});

export const fetchQuestions = (token) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json())
  .then((payload) => dispatch(requestQuestionsSuccess(payload)));

export const requestTokenSuccess = (payload) => ({
  type: 'REQUEST_SUCCESS',
  payload,
});

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((payload) => {
    dispatch(requestTokenSuccess(payload));
    dispatch(fetchQuestions(payload.token));
  });
