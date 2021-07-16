export const DATA_FAILURE = 'DATA_FAILURE';
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS';

export const dataFailure = (payload) => ({ type: DATA_FAILURE, payload });
export const getAllQuestions = (payload) => ({ type: GET_ALL_QUESTIONS, payload });
