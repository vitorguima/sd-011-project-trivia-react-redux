export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const setName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const setEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

const requestAPI = () => ({ type: FETCH_STARTED });
const requestApiSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload,
});
const requestApiError = (payload) => ({
  type: FETCH_ERROR,
  payload,
});

export const fetchApi = () => async (dispatch) => {
  try {
    dispatch(requestAPI());
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    return dispatch(requestApiSuccess(result));
  } catch (error) { dispatch(requestApiError(error.message)); }
};
