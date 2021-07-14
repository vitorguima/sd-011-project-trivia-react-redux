export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const FAILED_REQUEST_TOKEN = 'FAILED_REQUEST_TOKEN';

export const failedRequestToken = (error) => ({
  type: FAILED_REQUEST_TOKEN,
  error,
});
