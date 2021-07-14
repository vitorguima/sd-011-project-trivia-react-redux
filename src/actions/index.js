import getToken from '../services/getToken';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SUBMIT_TOKEN = 'SUBMIT_TOKEN';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
  loading: true,
});

export const submitToken = (token) => ({
  type: SUBMIT_TOKEN,
  token,
  loading: false,
});

export const saveToken = () => async (dispatch) => {
  dispatch((requestToken()));
  const token = await getToken();
  localStorage.setItem('token', token);
  return dispatch(submitToken(token));
};
