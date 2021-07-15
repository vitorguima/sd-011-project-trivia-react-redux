export const USER_EMAIL = 'USER_EMAIL';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED';

export const userEmail = (payload) => ({
  type: USER_EMAIL,
  payload,
});

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

export const getQuestionsFailed = (payload) => ({
  type: GET_QUESTIONS_FAILED,
  payload,
});

export const getQuestionsThunk = () => async (dispatch) => {
  dispatch(getQuestions());
  try {
    // lembrar de mudar o endpoint, tem que ser o token que vai estar no local storage
    const response = await fetch('https://opentdb.com/api.php?amount=5&token=eec59898594faa4f1423c3b8d5f9ec9368517c2a9dcadff9342dd7e048a75e2e');
    const results = await response.json();
    dispatch(getQuestionsSuccess(results));
  } catch (error) {
    dispatch(getQuestionsFailed(error));
  }
};
