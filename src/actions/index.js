export const NEW_USER = 'NEW_USER';
export const NEW_EMAIL = 'NEW_EMAIL';
export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';
export const REQUEST_TRIVIA_SUCCESS = 'REQUEST_TRIVIA_SUCCESS';
export const REQUEST_TRIVIA_ERROR = 'REQUEST_TRIVIA_ERROR';
export const TIMER_BUTTON = 'TIMER_BUTTON';
export const REQUEST_CLICK_BUTTON = 'REQUEST_CLICK_BUTTON';
export const NEXT_COUNT = 'NEXT_COUNT';

export const nextQuestionCount = (state) => ({
  type: NEXT_COUNT,
  state,
});

export const sendUser = (state) => ({
  type: NEW_USER,
  state,
});

export const sendEmail = (state) => ({
  type: NEW_EMAIL,
  state,
});

export const timerButton = (state) => ({
  type: TIMER_BUTTON,
  state,
});

export const clickButton = (state) => ({
  type: REQUEST_CLICK_BUTTON,
  state,
});

const requestTrivia = (state) => ({
  type: REQUEST_TRIVIA,
  state,
});

const requestTriviaSuccess = (state) => ({
  type: REQUEST_TRIVIA_SUCCESS,
  state,
});

const requestTriviaError = (state) => ({
  type: REQUEST_TRIVIA_ERROR,
  state,
});

export const fetchTrivia = (token) => (dispatch) => {
  dispatch(requestTrivia());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((result) => result.json())
    .then((data) => dispatch(requestTriviaSuccess(data)))
    .catch((error) => dispatch(requestTriviaError(error)));
};
