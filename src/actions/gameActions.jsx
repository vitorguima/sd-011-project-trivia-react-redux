export const DATA_FAILURE = 'DATA_FAILURE';
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS';
export const CURRENT_QUESTION = 'CURRENT_QUESTION';
export const NEXT_INDEX = 'NEXT_INDEX';
export const SET_TIMER = 'SET_TIMER';
export const SELECTED_CHOICE = 'SELECTED_CHOICE';

export const dataFailure = (payload) => ({ type: DATA_FAILURE, payload });
export const getAllQuestions = (payload) => ({ type: GET_ALL_QUESTIONS, payload });
export const getCurrentQuestion = () => ({ type: CURRENT_QUESTION });
export const nextIndex = () => ({ type: NEXT_INDEX });
export const setTimer = (payload) => ({ type: SET_TIMER, payload });
export const setPlayerChoice = (payload) => ({ type: SELECTED_CHOICE, payload });
