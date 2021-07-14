export const USER_EMAIL = 'USER_EMAIL';

export const userEmail = (payload) => ({
  type: USER_EMAIL,
  payload,
});

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCESS = 'REQUEST_TOKEN_SUCESS';
export const REQUEST_TOKEN_FAIL = 'REQUEST_TOKEN_FAIL';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenSucess = (payload) => ({
  type: REQUEST_TOKEN_SUCESS,
  payload,
});

const requestTokenFail = (payload) => ({
  type: REQUEST_TOKEN_FAIL,
  payload,
});

export const getApi = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await fetchApiToken.json();
    console.log(result);
    dispatch(requestTokenSucess(result));
    return result.token;
  } catch (error) {
    console.log(error);
    dispatch(requestTokenFail(error));
  }
};
