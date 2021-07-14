export const VALIDATE_LOGIN = 'VALIDATE_LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const validateLogin = (email, playerName) => ({
  type: VALIDATE_LOGIN,
  email,
  playerName,
});

export const updateScore = (score) => ({
  type: VALIDATE_LOGIN,
  score,
});

export const questionAPI = async () => {
  const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const dataToken = await fetchApiToken.json();
  const token = await dataToken.token;
  await localStorage.setItem('token', dataToken.token);
  const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple&token=${token}`);
  const data = await fetchApi.json();
  return data;
};
