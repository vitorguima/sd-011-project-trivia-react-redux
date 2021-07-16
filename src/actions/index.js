import axios from 'axios';

export const SUBMIT_FORM = 'SUBMIT_FORM';
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
const URL = 'https://opentdb.com/api_token.php?command=request';

export const submitForm = (payload) => ({
  type: SUBMIT_FORM,
  payload,
});

export const fetchToken = (payload) => ({
  type: FETCH_TOKEN,
  payload,
});

export const fetchQuestions = (payload) => ({
  type: FETCH_QUESTIONS,
  payload,
});

export const showLoading = () => ({
  type: SHOW_LOADING,
});

export const hideLoading = () => ({
  type: HIDE_LOADING,
});

export const getToken = () => (dispatch) => axios.get(URL)
  .then((response) => {
    const { token } = response.data;
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(fetchToken(token));
    dispatch(hideLoading());
  })
  .catch((err) => console.log(err.message));

export const getQuestions = (token) => (dispatch) => axios.get(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => {
    dispatch(showLoading());
    const { data } = response;
    dispatch(fetchQuestions(data.results));
    dispatch(hideLoading());
  })
  .catch((err) => console.log(err.message), dispatch(hideLoading()));
