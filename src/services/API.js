const URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = () => fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const { token } = data;
    localStorage.token = token;
    return token;
  });
  /* .then((token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`))
  .then((res) => res.json())
  .then(({ results }) => results);

export const getStorage = () => JSON.parse(localStorage.state); */
// export const getRanking = () => JSON.parse(localStorage.ranking);

export default getToken;

/* export function fetchAPI() {
  return async (dispatch) => {
    const result = await fetch('https://opentdb.com/api_token.php?command=request');
    const resultJson = await result.json();
    return dispatch(requestAPI(resultJson));
  };

  import { REQUEST_API } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

function reducerFetch(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  default:
    return state;
  }
}
export default reducerFetch;
 */
