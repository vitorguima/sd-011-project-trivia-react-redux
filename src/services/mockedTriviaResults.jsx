const getQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const r = await fetch(URL);
  const rJson = await r.json();
  const { results } = await rJson;

  try {
    return results;
  } catch (error) {
    throw new Error(error);
  }
};

export default getQuestions;
