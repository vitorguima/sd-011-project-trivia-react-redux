export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

export const requestApi = (payload) => ({
  type: REQUEST_API,
  payload,
});

export const requestApiSucess = (payload) => ({
  type: REQUEST_API_SUCESS,
  payload,
});

export const requestApiError = (payload) => ({
  type: REQUEST_API_ERROR,
  payload,
});

export const API = 'https://opentdb.com/api_token.php?command=request';

export const fetchApi = () => (dispatch) => {
  dispatch(requestApi());
  return fetch(API)
    .then((result) => result.json())
    .then((test) => test)
    .then((data) => {
      dispatch(requestApiSucess(data));
      localStorage.setItem('token', data.token); // Alteração
    })
    // .then((data) => dispatch(requestApiSucess(data)))
    .catch((error) => dispatch(requestApiError(error)));
};
