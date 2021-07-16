export const REQUEST_API_NEW = 'REQUEST_API_NEW';
export const REQUEST_API_NEW_SUCESS = 'REQUEST_API_NEW_SUCESS';
export const REQUEST_API_NEW_ERROR = 'REQUEST_API_NEW_ERROR';

export const requestApiNew = (payload) => ({
  type: REQUEST_API_NEW,
  payload,
});

export const requestApiNewSucess = (payload) => ({
  type: REQUEST_API_NEW_SUCESS,
  payload,
});

export const requestApiNewError = (payload) => ({
  type: REQUEST_API_NEW_ERROR,
  payload,
});

const getToken = localStorage.getItem('token');
const API = `https://opentdb.com/api.php?amount=5&token=${getToken}`;

export const fetchNewApi = () => (dispatch) => {
  dispatch(requestApiNew());
  return fetch(API)
    .then((result) => result.json())
    .then((data) => {
      dispatch(requestApiNewSucess(data));
    })
    .catch((error) => dispatch(requestApiNewError(error)));
};
