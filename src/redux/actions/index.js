export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const GET_DATA = 'GET_DATA';

export const requestAPI = () => ({ type: REQUEST_API });

export const getData = (data) => ({ type: GET_DATA, payload: { data } });

export function fetchAPIToken() {
  return async (dispatch) => {
    dispatch(requestAPI());
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(getData(data));
  };
}
