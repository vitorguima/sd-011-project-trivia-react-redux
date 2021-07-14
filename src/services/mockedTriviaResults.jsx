export const getQuestions = async () => {
  const URL = 'https://opentdb.com/api.php?amount=5';
  const r = await fetch(URL);
  const rJson = await r.json();
  const { results } = await rJson;
  try {
    return results;
  } catch (error) {
    throw new Error(error);
  }
};
