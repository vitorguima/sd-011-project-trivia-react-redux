export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME = 'SET_NAME';
export const SET_SECONDS_TO_FINISH = 'SET_SECONDS_TO_FINISH';
export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
export const WAS_ANSWERED = 'WAS_ANSWERED';
export const SET_SCORE = 'SET_SCORE';
export const TIME_ANSWERED = 'TIME_ANSWERED';
export const NEW_QUESTION_TIME = 'NEW_QUESTION_TIME';

export const setTimeScore = (payload) => ({
  type: TIME_ANSWERED,
  payload,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

export const answerObserver = (bool) => ({
  type: WAS_ANSWERED,
  payload: bool,
});

export const getNextQuestion = () => ({
  type: GET_NEXT_QUESTION,
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  email,
});

export const setName = (name) => ({
  type: SET_NAME,
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

export const setSecondsToFinish = () => ({
  type: SET_SECONDS_TO_FINISH,
});

export const newQuestionTime = () => ({
  type: NEW_QUESTION_TIME,
});
