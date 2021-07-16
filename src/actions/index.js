export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SEND_SCORE = 'SEND_SCORE';

export const login = (name, email, assertions = 0, score = 0) => ({
  type: REQUEST_TOKEN,
  payload: { name, gravatarEmail: email, assertions, score },
});

export const sendScore = (score) => ({
  type: SEND_SCORE,
  payload: { score },
});
