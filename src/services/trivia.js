export default async function getTriviaToken() {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await api.json();
  return json;
}
