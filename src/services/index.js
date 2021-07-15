const url = 'https://opentdb.com/api.php?';
const numberOfQuestions = 5;

const fetchApiQuestions = async (token, amount = numberOfQuestions) => {
  const response = await fetch(`${url}amount=${amount}&token=${token}`);
  const data = response.json();
  return data;
};

export default fetchApiQuestions;
