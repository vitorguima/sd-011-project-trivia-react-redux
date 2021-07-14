export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

export const requestApi = () => ({
  type: REQUEST_API,
});

export const requestApiSucess = (payload) => ({
  type: REQUEST_API_SUCESS,
  payload,
});

export const requestApiError = (payload) => ({
  type: REQUEST_API_ERROR,
  payload,
});

export const requestApiThunk = (token) => (dispatch) => {
  dispatch(requestApi());
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((res) => res.json())
    .then((data) => dispatch(requestApiSucess(data)))
    .catch((error) => dispatch(requestApiError(error)));
//   try {
//     const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
//     const results = await response.json();
//     dispatch(requestApiSucess(results));
//   } catch (error) {
//     dispatch(requestApiError(error));
//   }
};
