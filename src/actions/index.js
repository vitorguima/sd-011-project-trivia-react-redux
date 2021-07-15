export const SUBMIT_FORM = 'SUBMIT_FORM';
export const FETCH_TOKEN = 'FETCH_TOKEN';

export const submitForm = (payload) => ({
  type: SUBMIT_FORM,
  payload,
});

export const fetchToken = (payload) => ({
  type: FETCH_TOKEN,
  payload,
});
