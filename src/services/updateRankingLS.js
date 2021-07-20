export default function updateRanking(actionName) {
  const rankingPlayer = {
    name: actionName,
    picture: '',
    score: 0,
  };

  const ranking = localStorage.getItem('ranking');

  if (ranking === null) {
    return localStorage.setItem('ranking', JSON.stringify([rankingPlayer]));
  }
  const parseJSON = JSON.parse(ranking);
  if (parseJSON.every(({ name }) => name !== actionName)) {
    return (
      localStorage.setItem('ranking', JSON.stringify([...parseJSON, rankingPlayer]))
    );
  }
}
