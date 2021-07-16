export const USER_INFO = 'USER_INFO';
export const DATA_FAILURE = 'DATA_FAILURE';
export const GET_DATA = 'GET_DATA';
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS';
export const SCORE_INFO = 'SCORE_INFO';

export const sendInfo = (payload) => ({ type: USER_INFO, payload });
export const dataFailure = (payload) => ({ type: DATA_FAILURE, payload });
export const getAllQuestions = (payload) => ({ type: GET_ALL_QUESTIONS, payload });
export const sendScore = (payload) => ({ type: SCORE_INFO, payload });
