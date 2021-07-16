import { getAllQuestions, dataFailure } from '../actions/gameActions';

export const getQuestions = async (token) => {
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

export const fetchAPI = (token) => async (dispatch) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const r = await fetch(URL);
  const q = await r.json();
  try {
    return dispatch(getAllQuestions(q.results));
  } catch (error) {
    return dispatch(dataFailure(`${error}`));
  }
};
