export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_NAME = 'GET_NAME';
export const GET_SECONDS = 'GET_SECONDS';
export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
export const WAS_ANSWERED = 'WAS_ANSWERED';

export const answerObserver = (wasAnswered) => ({
  type: WAS_ANSWERED,
  payload: wasAnswered,
});

export const sumQuestionNumber = (number) => ({
  type: GET_NEXT_QUESTION,
  payload: number,
});

export const getEmail = (email) => ({
  type: 'GET_EMAIL',
  email,
});

export const getName = (name) => ({
  type: 'GET_NAME',
  name,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const requestApiSucess = (payload) => ({
  type: REQUEST_API_SUCESS,
  payload,
});

export const requestApiError = (payload) => ({
  type: REQUEST_API_ERROR,
  payload,
});

export const requestApiThunk = (token) => (dispatch) => {
  dispatch(requestApi());
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((res) => res.json())
    .then((data) => dispatch(requestApiSucess(data)))
    .catch((error) => dispatch(requestApiError(error)));
};

export const getSeconds = (seconds) => ({
  type: GET_SECONDS,
  seconds,
});
