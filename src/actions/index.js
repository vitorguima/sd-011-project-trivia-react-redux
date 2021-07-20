import md5 from 'crypto-js/md5';

// Actions para o Reducer Cronometer
export const COUNTDOWN = 'COUNTDOWN';
export const STOP_COUNTDOWN = 'STOP_COUNTDOWN';
export const RESET_COUNTDOWN = 'RESET_COUNTDOWN';

export const stopCountdownTimer = () => ({ type: STOP_COUNTDOWN });
export const resetCountdownTimer = () => ({ type: RESET_COUNTDOWN });
const countdownTimer = () => ({ type: COUNTDOWN });
export const reduceSecond = (timer) => (dispatch) => {
  if (timer > 0) {
    return dispatch(countdownTimer());
  }
  return dispatch(stopCountdownTimer());
};

// Actions para o Reducer Game
export const TOKEN = 'TOKEN';
export const QUESTIONS = 'QUESTIONS';

const receiveToken = (token) => ({ type: TOKEN, token });
const receiveQuestions = (questions) => ({ type: QUESTIONS, questions });
export const fetchQuestions = () => (dispatch) => (fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then(({ token }) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((questions) => dispatch(receiveQuestions(questions)))
    .then(() => dispatch(receiveToken(token))))
);

// Actions para o Reducer Player
export const LOGIN = 'LOGIN';
export const GRAVATAR = 'GRAVATAR';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const loginAction = (name, email) => ({ type: LOGIN, email, name });
const receiveGravatar = (gravatar) => ({ type: GRAVATAR, gravatar });
export const updateScore = (points) => ({ type: UPDATE_SCORE, points });
export const fetchGravatar = (email) => (dispatch) => {
  const hashEmail = md5(email).toString();
  return fetch(`https://www.gravatar.com/avatar/${hashEmail}`)
    .then((gravatar) => dispatch(receiveGravatar(gravatar.url)));
};
