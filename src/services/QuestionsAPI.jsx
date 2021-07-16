/* eslint-disable import/prefer-default-export */
import { getAllQuestions, dataFailure } from '../actions/gameActions';

export const fetchAPI = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const r = await fetch(URL);
  const q = await r.json();
  try {
    return dispatch(getAllQuestions(q.results));
  } catch (error) {
    return dispatch(dataFailure(`${error}`));
  }
};
