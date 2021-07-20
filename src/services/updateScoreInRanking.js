export default function uptadeScoreRankingInLocalStorage(playerName, score) {
  const storage = JSON.parse(localStorage.getItem('ranking'));
  const playerToAddScore = storage.filter((player) => playerName === player);
  playerToAddScore.score = score;
  localStorage.setItem('ranking', [...storageJSON.stringify()]);
}
