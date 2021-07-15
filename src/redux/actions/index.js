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

export const getToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((result) => result.json())
  .then((data) => dispatch(changeToken(data.token)));
