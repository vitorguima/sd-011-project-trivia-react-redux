export const GET_LOGIN = 'GET_LOGIN';
export const getLogin = (payload) => ({ type: GET_LOGIN, payload });

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const requestToken = () => ({ type: REQUEST_TOKEN });

export const REQUEST_SUCCESS_TOKEN = 'REQUEST_SUCCESS_TOKEN';
export const requestSuccessToken = (payload) => ({
  type: REQUEST_SUCCESS_TOKEN,
  payload,
});

export const REQUEST_QUESTS = 'REQUEST_QUESTS';
export const requestQuests = () => ({ type: REQUEST_QUESTS });

export const REQUEST_SUCCESS_QUESTS = 'REQUEST_SUCCESS_QUESTS';
export const requestSuccessQuests = (payload) => ({
  type: REQUEST_SUCCESS_QUESTS,
  payload,
});
