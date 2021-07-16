export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_QUESTIONS_SUCCESS = 'SAVE_QUESTIONS_SUCCESS';
export const SAVE_QUESTIONS_ERROR = 'SAVE_QUESTIONS_ERROR';
export const BUTTONS_DISABLED_TRUE = 'BUTTONS_DISABLED_TRUE';
export const BUTTONS_DISABLED_FALSE = 'BUTTONS_DISABLED_TRUE';

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const saveQuestionsSuccess = (payload) => ({
  type: SAVE_QUESTIONS_SUCCESS,
  payload,
});

export const saveQuestionsError = (payload) => ({
  type: SAVE_QUESTIONS_ERROR,
  payload,
});

export const disableButtonTrue = (payload) => ({
  type: BUTTONS_DISABLED_TRUE,
  payload,
});

export const disableButtonFalse = (payload) => ({
  type: BUTTONS_DISABLED_FALSE,
  payload,
});
