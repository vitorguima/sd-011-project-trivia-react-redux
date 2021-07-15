import axios from 'axios';

export const SUBMIT_FORM = 'SUBMIT_FORM';
export const FETCH_TOKEN = 'FETCH_TOKEN';
const URL = 'https://opentdb.com/api_token.php?command=request';

export const submitForm = (payload) => ({
  type: SUBMIT_FORM,
  payload,
});

export const fetchToken = (payload) => ({
  type: FETCH_TOKEN,
  payload,
});

export const getToken = () => (dispatch) => axios.get(URL)
  .then((response) => {
    const { token } = response.data;
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(fetchToken(token));
  })
  .catch((err) => console.log(err.message));
