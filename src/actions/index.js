export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const FAILED_TOKEN_REQUEST = 'FAILED_TOKEN_REQUEST';
export const GET_TOKEN = 'GET_TOKEN';
export const TRIVIA_REQUEST = 'TRIVIA_REQUEST';
export const FAILED_TRIVIA_REQUEST = 'FAILED_TRIVIA_REQUEST';
export const GET_TRIVIA = 'GET_TRIVIA';
export const ANSWER_BUTTON_CLICKED = 'ANSWER_BUTTON_CLICKED';
export const ANSWER_RESET = 'ANSWER_RESET';
export const START_TIMER = 'START_TIMER';
export const UPDATE_TIMER = 'UPDATE_TIMER';
export const TIMER_RUNOUT = 'TIMER_RUNOUT';
export const RESET_TIMER = 'RESET_TIMER';

export const triviaRequest = () => ({
  type: TRIVIA_REQUEST,
});

export const failedTriviaRequest = (error) => ({
  type: FAILED_TRIVIA_REQUEST,
  error,
});

export const getTrivia = (json) => ({
  type: GET_TRIVIA,
  json,
});

export const fetchApiTrivia = (token) => async (dispatch) => {
  await dispatch(triviaRequest());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then(
      (json) => dispatch(getTrivia(json)),
      (error) => dispatch(failedTriviaRequest(error)),
    );
};

export const tokenRequest = () => ({
  type: TOKEN_REQUEST,
});

export const failedTokenRequest = (error) => ({
  type: FAILED_TOKEN_REQUEST,
  error,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const fetchApiToken = () => async (dispatch) => {
  await dispatch(tokenRequest());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then(
      (json) => {
        localStorage.setItem('token', json.token);
        dispatch(fetchApiTrivia(json.token));
        dispatch(getToken(json));
      },
      (error) => dispatch(failedTokenRequest(error)),
    );
};

export const answerButtonClickedAction = () => ({
  type: ANSWER_BUTTON_CLICKED,
});

export const answerReset = () => ({
  type: ANSWER_RESET,
  payload: false,
});

export const startTimer = () => ({
  type: START_TIMER,
});

export const timerRunout = () => ({
  type: TIMER_RUNOUT,
});

export const updateTimer = (value) => ({
  type: UPDATE_TIMER,
  value,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});
