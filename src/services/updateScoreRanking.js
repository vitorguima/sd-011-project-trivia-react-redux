export default function updateScoreRankingInLocalStorage(playerName, score, picture) {
  const storage = JSON.parse(localStorage.getItem('ranking'));
  const updatedScore = storage.map((player) => {
    if (playerName === player.name) {
      return {
        ...player, score: player.score + score, picture,
      };
    }
    return player;
  });
  localStorage.setItem('ranking', JSON.stringify([...updatedScore]));
}
