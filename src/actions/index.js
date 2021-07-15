import { getGravatar } from '../services/api';

export const LOGIN = 'LOGIN';

export const login = (username, avatar) => ({
  type: LOGIN,
  username,
  avatar,
  score: 0,
});

export const loginAction = (username, email) => (dispatch) => {
  getGravatar(email).then((response) => dispatch(login(username, response.url)));
};
