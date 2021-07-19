export const SUB_TIMER = 'SUB_TIMER';
export const ENABLE_BTNS = 'ENABLE_BTNS';
export const SCORE_UPDATE = 'SCORE_UPDATE';
export const RESET_TIMER = 'RESET_TIMER';
export const LOGIN_INPUT = 'LOGIN_INPUT';

export const loginInputs = ({ target }) => {
  const { name } = target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  return {
    type: LOGIN_INPUT,
    name,
    value,
  };
};

export const requestSucess = (payload) => ({
  type: 'REQUEST_SUCESS',
  payload,
});

export const requestError = (payload) => ({
  type: 'REQUEST_ERROR',
  payload,
});

export const fetchTriviaApi = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((result) => result.json())
  .then((resJson) => dispatch(requestSucess(resJson)))
  .catch((error) => dispatch(requestError(error.message)));

export const requestQuestions = (payload) => ({
  type: 'REQUEST_QUESTIONS',
  payload,
});

export const fetchTriviaQuestions = (token) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((result) => result.json())
  .then((resJson) => dispatch(requestQuestions(resJson)));

export const subTimer = () => ({
  type: SUB_TIMER,
});

export const enablebtns = () => ({
  type: ENABLE_BTNS,
});

export const dispatchScore = (score) => ({
  type: SCORE_UPDATE,
  payload: score,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});
