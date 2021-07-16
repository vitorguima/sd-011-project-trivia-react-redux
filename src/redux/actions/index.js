export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const GET_DATA = 'GET_DATA';
export const GET_USER_NAME_AND_EMAIL = 'GET_USER_NAME_AND_EMAIL';
export const REQUEST_API_QUESTIONS = 'REQUEST_API_QUESTIONS';
export const GET_DATA_QUESTIONS = 'GET_DATA_QUESTIONS';

export const requestAPI = () => ({ type: REQUEST_API });

export const getData = (data) => ({ type: GET_DATA, payload: { data } });

export function fetchAPIToken() {
  return async (dispatch) => {
    dispatch(requestAPI());
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(getData(data));
  };
}

export const requestAPIQuestions = () => ({ type: REQUEST_API_QUESTIONS });

export const getDataOfQuestions = (data) => ({
  type: GET_DATA_QUESTIONS,
  payload: { data },
});

export function fetchAPIQuestions(param) {
  return async (dispatch) => {
    dispatch(requestAPIQuestions());
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${param}`);
    const data = await response.json();
    dispatch(getDataOfQuestions(data));
  };
}

export const getUserNameAndEmail = (name, email) => ({
  type: GET_USER_NAME_AND_EMAIL,
  name,
  email,
});
