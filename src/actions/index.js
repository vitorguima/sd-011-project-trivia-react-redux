export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const STORE_LOGIN_EMAIL = 'STORE_LOGIN_EMAIL';
export const QUESTION_REQUEST = 'QUESTION_REQUEST';

function handleStoreLoginEmail(name, email) {
  return { type: STORE_LOGIN_EMAIL, payload: { name, email } };
}

function handleFetchTokenSuccess(json) {
  window.localStorage.setItem('token', json.token);
  return { type: REQUEST_TOKEN_SUCCESS, payload: json.token };
}

export function questionsGame() {
  return (dispatch) => {
    const tokenLocalStorage = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`)
      .then((response) => response.json())
      .then(
        (json) => dispatch(handleQuestionsSuccess(json.results)),
        (error) => console.log(error),
      );
  }
}

export function startGame(name, email) {
  return (dispatch) => {
    dispatch(handleStoreLoginEmail(name, email));
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then(
        (json) => dispatch(handleFetchTokenSuccess(json)),
        (error) => console.log(error),
      )
      .then(() => questionsGame());
  };
}

function handleQuestionsSuccess(json) {
  return { type: QUESTION_REQUEST, payload: json };
}

