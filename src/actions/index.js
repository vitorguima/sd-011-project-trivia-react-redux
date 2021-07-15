export const VALIDATE_LOGIN = 'VALIDATE_LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const validateLogin = (gravatarEmail, name) => ({
  type: VALIDATE_LOGIN,
  gravatarEmail,
  name,
});

export const updateScore = (score) => ({
  type: VALIDATE_LOGIN,
  score,
});
