export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_QUESTIONS_SUCCESS = 'SAVE_QUESTIONS_SUCCESS';
export const SAVE_QUESTIONS_ERROR = 'SAVE_QUESTIONS_ERROR';
export const BUTTONS_DISABLED_TRUE = 'BUTTONS_DISABLED_TRUE';
export const BUTTONS_DISABLED_FALSE = 'BUTTONS_DISABLED_TRUE';
export const ROLE_QUESTION = 'ROLE_QUESTION';
export const ANSWERED_QUESTION = 'ANSWERED_QUESTION';

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

export const roleQuestions = (payload) => ({
  type: ROLE_QUESTION,
  payload,
});

export const answeredQuestion = (payload) => ({
  type: ANSWERED_QUESTION,
  payload,
});
