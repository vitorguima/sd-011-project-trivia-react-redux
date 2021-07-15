export const SAVE_LOGIN = 'SAVE_LOGIN';

export const saveLogin = (email, name) => ({
  type: SAVE_LOGIN,
  email,
  name,
});
