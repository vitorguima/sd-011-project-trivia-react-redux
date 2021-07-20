export const fetchToken = () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => (data))
    .catch((error) => error);
};

export const fetchQuestions = (token,
  questionCategory,
  questionDifficulty,
  questionType) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}&category=${questionCategory}&difficulty=${questionDifficulty}&type=${questionType}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => (data))
    .catch((error) => error);
};
