import md5 from 'crypto-js/md5';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const GRAVATAR = 'GRAVATAR';
export const QUESTIONS = 'QUESTIONS';
export const COUNTDOWN = 'COUNTDOWN';
export const STOP_COUNTDOWN = 'STOP_COUNTDOWN';

export const loginAction = (name, email) => ({ type: LOGIN, email, name });
const receiveToken = (token) => ({ type: TOKEN, token });
const receiveGravatar = (gravatar) => ({ type: GRAVATAR, gravatar });
const receiveQuestions = (questions) => ({ type: QUESTIONS, questions });
const countdownTimer = () => ({ type: COUNTDOWN });
export const stopCountdownTimer = () => ({ type: STOP_COUNTDOWN });

export const fetchGravatar = (email) => (dispatch) => {
  const hashEmail = md5(email).toString();
  return fetch(`https://www.gravatar.com/avatar/${hashEmail}`)
    .then((gravatar) => dispatch(receiveGravatar(gravatar.url)));
};

export const fetchToken = () => (dispatch) => (fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((token) => dispatch(receiveToken(token))));

export const fetchGame = (token) => (dispatch) => (fetch(`https://opentdb.com/api.php?amount=5&token=${token}`))
  .then((response) => response.json())
  .then((questions) => dispatch(receiveQuestions(questions)));

export const reduceSecond = (timer) => (dispatch) => {
  console.log(timer);
  if (timer > 0) {
    return dispatch(countdownTimer());
  }
  return dispatch(stopCountdownTimer());
};
