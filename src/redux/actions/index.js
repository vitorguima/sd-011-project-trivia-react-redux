export const requestTokenSuccess = (payload) => ({
  type: 'REQUEST_SUCCESS',
  payload,
});

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((payload) => dispatch(requestTokenSuccess(payload)));
