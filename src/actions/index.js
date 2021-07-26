export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SEND_SCORE = 'SEND_SCORE';
export const SEND_RANKING = 'SEND_RANKING';

export const login = (name, email, assertions = 0, score = 0) => ({
  type: REQUEST_TOKEN,
  payload: { name, gravatarEmail: email, assertions, score },
});

export const sendScore = (score) => ({
  type: SEND_SCORE,
  payload: { score },
});

export const ranking = ({ name, score, picture }) => ({
  type: SEND_RANKING,
  payload: {
    name,
    score,
    picture,
  },
});
