export const USER_LOGIN = 'USER_LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const sendQuestionsArray = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const rquestQuestions = () => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('token'));
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await response.json();
  dispatch(sendQuestionsArray(results));
};

export const requestToken = (userName, email) => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const object = await response.json();
  localStorage.setItem('token', JSON.stringify(object));
  const { token } = JSON.parse(localStorage.getItem('token'));
  const infos = {
    name: userName,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
    token,
    ranking: [],
  };
  localStorage.setItem('player', JSON.stringify(infos));
  dispatch(userLogin(infos));
};
