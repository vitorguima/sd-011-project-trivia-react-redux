export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const STORE_LOGIN_EMAIL = 'STORE_LOGIN_EMAIL';

function handleStoreLoginEmail(name, email) {
  return { type: STORE_LOGIN_EMAIL, payload: { name, email } };
}

function handleFetchTokenSuccess(json) {
  window.localStorage.setItem('token', json.token);
  return { type: REQUEST_TOKEN_SUCCESS, payload: json.token };
}

export function startGame(name, email) {
  return (dispatch) => {
    dispatch(handleStoreLoginEmail(name, email));
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then(
        (json) => dispatch(handleFetchTokenSuccess(json)),
        (error) => console.log(error),
      );
  };
}
