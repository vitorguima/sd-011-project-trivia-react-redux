import { requestSuccessQuests, requestQuests } from '../actions';

export default function requisitionQuests(token) {
  return async (dispatch) => {
    try {
      dispatch(requestQuests());
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      dispatch(requestSuccessQuests(data.results));
    } catch (error) {
      console.error(error);
    }
  };
}
