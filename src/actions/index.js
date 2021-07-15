export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';

function handleFetchTokenSuccess(json) {
  window.localStorage.setItem('token', json.token);
  return { type: REQUEST_TOKEN_SUCCESS, payload: json.token };
}

export function fetchToken() {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then(
      (json) => dispatch(handleFetchTokenSuccess(json)),
      (error) => console.log(error),
    );
}
