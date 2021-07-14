export const LOGIN = 'LOGIN';

export function setLogin(name, email) {
  return {
    type: LOGIN,
    name,
    email,
  };
}
