import { requestToken, requestSuccessToken } from '../actions';
import requisitionQuests from './RequisitionQuests';

export default function requisitionToken() {
  return async (dispatch) => {
    try {
      dispatch(requestToken());
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      dispatch(requestSuccessToken(data));
      dispatch(requisitionQuests(data.token));
    } catch (error) {
      console.error(error);
    }
  };
}
