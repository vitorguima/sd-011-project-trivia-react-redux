export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

// exemplo action:
// export function userAction(email) {
//   return ({
//     type: INPUT_USER,
//     email,
//   });
// }

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const receiveToken = (token) => ({
  type: RECEIVE_TOKEN,
  token,
});

export function fetchToken() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  return (dispatch) => {
    dispatch(requestToken());
    return fetch(endpoint)
      .then((response) => response.json())
      .then((obj) => dispatch(receiveToken(obj)));
  };
}
