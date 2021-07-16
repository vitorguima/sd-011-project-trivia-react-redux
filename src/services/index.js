const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const dataToken = await fetch(TOKEN_URL);
  return dataToken.json();
};

export default getToken;

const URL_QTS = 'https://opentdb.com/api.php?';
const DEFAULT_QTY = 5;
export const getQuestions = async (token, qty = DEFAULT_QTY) => {
  // const params = [{ category }, { difficulty }, { qty }, { token }];
  // const url = buildUrl(URL_QTS, params);
  const questionsData = await fetch(`${URL_QTS}amount=${qty}&token=${token}`);
  return questionsData.json();
};

// function buildUrl(urlFrom, params) {
//   let urlToBuild = urlFrom;
//   params.forEach((e) => {
//     const key = Object.keys(e);
//     const value = Object.values(e);
//     if (value) urlToBuild = urlToBuild.concat(`&${key}=`, value);
//   });
//   return urlToBuild;
// }

// , category = '', difficulty = ''
