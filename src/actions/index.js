export const USER_INFO = 'USER_INFO';
export const DATA_FAILURE = 'DATA_FAILURE';
export const GET_DATA = 'GET_DATA';

export const sendInfo = (payload) => ({ type: USER_INFO, payload });
export const dataFailure = (payload) => ({ type: DATA_FAILURE, payload });
