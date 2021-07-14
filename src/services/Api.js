const API_URL = 'https://opentdb.com/api_token.php?command=request';

export default async function fetchToken() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const { token } = data;
  localStorage.setItem('token', JSON.stringify(token));
}
