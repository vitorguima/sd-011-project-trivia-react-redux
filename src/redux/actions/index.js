export const changeEmail = (payload) => ({
  type: 'CHANGE_EMAIL',
  payload,

});

export const changeName = (payload) => ({
  type: 'CHANGE_NAME',
  payload,
});

export const changeToken = (payload) => ({
  type: 'CHANGE_TOKEN',
  payload,
});

export const changeScore = (payload) => ({
  type: 'CHANGE_SCORE',
  payload,
});

export const changeAssertions = (payload) => ({
  type: 'CHANGE_ASSERTIONS',
  payload,
});

export const changeQuestions = (payload) => ({
  type: 'CHANGE_QUESTIONS',
  payload,
});

export const getToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((result) => result.json())
  .then((data) => dispatch(changeToken(data.token)));

export const getQuestions = (token) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((result) => result.json())
  .then((data) => dispatch(changeQuestions(data.results)));
