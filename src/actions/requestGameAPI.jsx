export const REQUEST_API_NEW = 'REQUEST_API_NEW';
export const REQUEST_API_NEW_SUCESS = 'REQUEST_API_NEW_SUCESS';
export const REQUEST_API_NEW_ERROR = 'REQUEST_API_NEW_ERROR';

const requestApiNew = (payload) => ({
  type: REQUEST_API_NEW,
  payload,
});

const requestApiNewSucess = (payload) => ({
  type: REQUEST_API_NEW_SUCESS,
  payload,
});

const requestApiNewError = (payload) => ({
  type: REQUEST_API_NEW_ERROR,
  payload,
});

export const fetchNewApi = () => (dispatch) => {
  const getToken = localStorage.getItem('token'); // Req 5
  const API = `https://opentdb.com/api.php?amount=5&token=${getToken}`; // Req 5
  dispatch(requestApiNew());
  return fetch(API)
    .then((result) => result.json())
    .then((data) => {
      dispatch(requestApiNewSucess(data));
    })
    .catch((error) => dispatch(requestApiNewError(error)));
};
