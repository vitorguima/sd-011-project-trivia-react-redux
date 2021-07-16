export const DATA_FAILURE = 'DATA_FAILURE';
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS';
export const CURRENT_QUESTION = 'CURRENT_QUESTION';
export const NEXT_INDEX = 'NEXT_INDEX';

export const dataFailure = (payload) => ({ type: DATA_FAILURE, payload });
export const getAllQuestions = (payload) => ({ type: GET_ALL_QUESTIONS, payload });
export const getCurrentQuestion = () => ({ type: CURRENT_QUESTION });
export const nextIndex = () => ({ type: NEXT_INDEX });
