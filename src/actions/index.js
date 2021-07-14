export const NEW_USER = 'NEW_USER';
export const NEW_EMAIL = 'NEW_EMAIL';

export const sendUser = (state) => ({
  type: NEW_USER,
  state,
});

export const sendEmail = (state) => ({
  type: NEW_EMAIL,
  state,
});
