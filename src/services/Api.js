import md5 from 'crypto-js/md5';
import { saveQuestions } from '../actions';

const API_URL = 'https://opentdb.com/api_token.php?command=request';

export default async function fetchToken() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const { token } = data;
  localStorage.setItem('token', JSON.stringify(token));
}

export async function fetchGravatar(email, name) {
  const generateHash = md5(email).toString();
  console.log(generateHash);
  const response = await fetch(`https://www.gravatar.com/avatar/${generateHash}`);
  const data = await response.url;
  const player = {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
  };
  const ranking = [{ name, score: 0, picture: data }];
  localStorage.setItem('player', JSON.stringify(player));
  localStorage.setItem('ranking', JSON.stringify(ranking));
}

const saveQuestionsToStore = (questions) => (dispatch) => {
  dispatch(saveQuestions(questions));
};

export async function fetchQuestions(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();

  return data.response_code === 0 ? saveQuestionsToStore(data.results) : console.log('');
}
