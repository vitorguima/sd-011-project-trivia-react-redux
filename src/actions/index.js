import getToken from '../services/API';

export const SUCESS = 'SUCESS';
export const FAIL = 'SUCESS';

/* export const loading = (payload) => ({
  type: LOADING,
  payload,
}); */

export const success = (payload) => ({
  type: SUCESS,
  payload,
});

/* export const fail = (payload) => ({
  type: FAIL,
  payload,
});
 */
export const thunkToken = () => async (dispatch) => {
  const callGetToken = await getToken();
  dispatch(success(callGetToken));
};
