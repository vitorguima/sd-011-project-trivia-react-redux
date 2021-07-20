export const tokenApi = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    return token.token;
  } catch (error) {
    console.log(error);
  }
};

export const takeQuestionsApi = async (token) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Para usar a função redirect.call(this, url)
 * @param {string} url url relativa para a qual a aplicação será redirecionada
 *
 */
export function redirect(url) {
  const { history } = this.props;
  history.push(url);
}
