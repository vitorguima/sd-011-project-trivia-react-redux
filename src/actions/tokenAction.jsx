export const SET_TOKEN = 'SET_TOKEN';
export const DATA_FAILURE = 'DATA_FAILURE';

export const sendToken = (payload) => ({ type: SET_TOKEN, payload });
export const dataFailure = (payload) => ({ type: DATA_FAILURE, payload });
