export const USER = 'USER';
export const APIQUESTIONS = 'APIQUESTIONS';
export const TOKEN = 'TOKEN';

export const user = (payload) => ({
  type: 'USER',
  payload,
});

export const apiQuestion = (payload) => ({
  type: 'APIQUESTION',
  payload,
});

export const token = (payload) => ({
  type: 'TOKEN',
  payload,
});
