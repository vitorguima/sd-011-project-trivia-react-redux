export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';

function InfoPlayer(name, email) {
  return {
    type: 'PLAYER_INFO',
    name,
    email,
  };
}

export default InfoPlayer;

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenSuccess = (payload) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload,
});

const requestTokenError = (payload) => ({
  type: REQUEST_TOKEN_ERROR,
  payload,
});

export const fetchToken = (namePlayer, emailPlayer) => (dispatch) => {
  dispatch(requestToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((result) => result.json())
    .then((data) => {
      const player = {
        name: namePlayer,
        assertions: '',
        score: 0,
        gravatarEmail: emailPlayer,
      };
      localStorage.setItem('player', JSON.stringify(player));
      localStorage.setItem('token', data.token);
      dispatch(requestTokenSuccess(data));;
    })
    .catch((error) => dispatch(requestTokenError(error)));
};
