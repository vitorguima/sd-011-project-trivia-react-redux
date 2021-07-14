export const NEW_USER = 'NEW_USER';

export const sendUser = (email, user) => ({
  type: 'NEW_USER',
  email,
  user,
});
