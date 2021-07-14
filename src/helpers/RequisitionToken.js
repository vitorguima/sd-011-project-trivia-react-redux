import { requestToken, requestSuccessToken } from '../actions';

export default function requisitionToken() {
  return async (dispatch) => {
    try {
      dispatch(requestToken());
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      dispatch(requestSuccessToken(data));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
}
