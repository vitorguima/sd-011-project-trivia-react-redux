export default async function requisitionQuests(token) {
  const Api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json());
  return Api;
}
