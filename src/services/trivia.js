import { sendToken, dataFailure } from '../actions/tokenAction';
import { sendInfo } from '../actions';

export async function getTriviaToken() {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await api.json();
  return json;
}

export const fetchToken = (user) => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const json = await response.json();
  const { token } = json;
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    dispatch(sendInfo(user));
    return dispatch(sendToken(token));
  } catch (error) {
    return dispatch(dataFailure(`${error}`));
  }
};

export const getPlayerInfo = (setPlayer) => {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const state = {
    name,
    gravatarEmail: email,
    assertions: 0,
    score: 0,
  };
  return setPlayer({ player: state });
};
