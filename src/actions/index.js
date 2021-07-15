export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const login = (name, email, assertions = 0, score = 0) => ({
  type: REQUEST_TOKEN,
  payload: { name, gravatarEmail: email, assertions, score },
});
