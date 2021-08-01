const tokenApi = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    return token.token;
  } catch (error) {
    console.log(error);
  }
};
export default tokenApi;
export const getQuestionApi = async (token) => {
  const TRIVIA_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(TRIVIA_URL);
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.log(error);
  }
};

export function redirect(url) {
  const { history } = this.props;
  history.push(url);
}
