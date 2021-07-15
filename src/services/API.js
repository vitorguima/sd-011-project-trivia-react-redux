export const fetchToken = () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => (data))
    .catch((error) => error);
};

export const fetchQuestions = (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => (data))
    .catch((error) => error);
};
