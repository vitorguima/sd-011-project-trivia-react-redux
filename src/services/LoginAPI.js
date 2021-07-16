/* eslint-disable import/prefer-default-export */
import { MD5 } from 'crypto-js';
import { dataFailure } from '../actions/tokenAction';
import { sendInfo } from '../actions';

export const fetchUser = (user) => async (dispatch) => {
  const { name, email } = user;
  const hashEmail = MD5(email).toString();
  const player = {
    name,
    gravatarEmail: email,
    assertions: 0,
    score: 0,
  };
  localStorage.hashEmail = hashEmail;
  localStorage.state = JSON.stringify({ player });
  try {
    dispatch(sendInfo({ ...player }));
  } catch (error) {
    return dispatch(dataFailure(`${error}`));
  }
};

export const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const json = await response.json();
  const { token } = json;
  return localStorage.setItem('token', token);
};
