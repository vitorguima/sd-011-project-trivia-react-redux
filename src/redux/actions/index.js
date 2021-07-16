import md5 from 'crypto-js/md5';

export const requestQuestionsSuccess = (payload) => ({
  type: 'REQUEST_QUESTIONS_SUCCESS',
  payload,
});

export const fetchQuestions = (token, url) => (dispatch) => fetch(`${url}${token}`)
  .then((response) => response.json())
  .then((payload) => dispatch(requestQuestionsSuccess(payload)));

export const requestTokenSuccess = (payload) => ({
  type: 'REQUEST_SUCCESS',
  payload,
});

export const fetchToken = (url) => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((payload) => {
    dispatch(requestTokenSuccess(payload));
    console.log(url);
    dispatch(fetchQuestions(payload.token, url));
  });

export const getHashGravatar = (email, name) => {
  const hash = md5(email).toString();
  return {
    type: 'SET_USER',
    email,
    name,
    hash,
  };
};

export const savePlayerToRank = (payload) => ({
  type: 'SAVE_PLAYER_RANK',
  payload,
});

export const changeSettings = (url) => ({
  type: 'CHANGE_SETTINGS',
  url,
});
