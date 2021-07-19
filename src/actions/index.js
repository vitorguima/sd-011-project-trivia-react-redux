export const USER_LOGIN = 'USER_LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_SCORE_POINTS = 'SET_SCORE_POINTS';
export const SEND_ASSERTION = 'SEND_ASSERTION';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const sendQuestionsArray = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const sendScorePointsLocalStorage = (payload) => ({
  type: SET_SCORE_POINTS,
  payload,
});

export const sendScorePoints = (payload) => (dispatch) => {
  const { player } = JSON.parse(localStorage.getItem('state'));
  localStorage.setItem('state', JSON.stringify({
    player: {
      ...player,
      score: payload,
    },
  }));
  dispatch(sendScorePointsLocalStorage(payload));
};

export const sendAssertionsRedux = (payload) => ({
  type: SEND_ASSERTION,
  payload,
});

export const sendAssertions = (payload) => (dispatch) => {
  const { player } = JSON.parse(localStorage.getItem('state'));
  console.log({ ...player, assertions: payload });
  localStorage.setItem('state', JSON.stringify({
    player: {
      ...player,
      assertions: payload,
    },
  }));
  dispatch(sendAssertionsRedux(payload));
};

export const rquestQuestions = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await response.json();
  dispatch(sendQuestionsArray(results));
};

export const requestToken = (userName, email) => async (dispatch) => {
  const infos = {
    player: {
      name: userName,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  };
  localStorage.setItem('state', JSON.stringify(infos));

  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const object = await response.json();
  const { token } = object;
  localStorage.setItem('token', JSON.stringify(token));
  dispatch(rquestQuestions(token));
  dispatch(userLogin(infos));
};
