// import { saveQuestions, saveQuestionsSuccess, saveQuestionsError } from '../actions';

const API_URL = 'https://opentdb.com/api_token.php?command=request';

export default async function fetchToken() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const { token } = data;
  localStorage.setItem('token', JSON.stringify(token));
}

export async function fetchGravatar(email, name) {
  const state = {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  };
  localStorage.setItem('state', JSON.stringify(state));
}

export async function fetchQuestions(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();

  return data.results;
}

// =============================================================
// ALTERNATIVA DE CÓDIGO
// =============================================================

// export const fetchQuestions = (token) => (dispatch) => {
//   dispatch(saveQuestions());
//   return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
//     .then((response) => response.json())
//     .then((data) => dispatch(saveQuestionsSuccess(data)))
//     .catch((error) => dispatch(saveQuestionsError(error)));
// };
