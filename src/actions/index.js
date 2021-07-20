export const USER = 'USER';
export const QUESTIONS_API = 'QUESTIONS_API';
export const TOKEN = 'TOKEN';
export const SCORE = 'SCORE';

export const user = (payload) => ({
  type: 'USER',
  payload,
});

export const questionsApi = (payload) => ({
  type: 'QUESTIONS_API',
  payload,
});

export const token = (payload) => ({
  type: 'TOKEN',
  payload,
});

export const createScore = (payload) => ({
  type: 'SCORE',
  payload,
});
