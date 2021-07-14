import md5 from 'crypto-js/md5';

export const requestTokenSuccess = (payload) => ({
  type: 'REQUEST_SUCCESS',
  payload,
});

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((payload) => dispatch(requestTokenSuccess(payload)));

export const getHashGravatar = (email, name) => {
  const hash = md5(email).toString();
  return {
    type: 'SET_USER',
    email,
    name,
    hash,
  };
};
