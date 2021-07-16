export default function scoreCalculator(counterTime, questionDifficulty, currentScore, score) {
  const difficulty = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  const scorePoints = 10;
  let state = JSON.parse(localStorage.getItem('state'));
  state.player.score = currentScore + scorePoints + (counterTime * difficulty[questionDifficulty]);
  localStorage.setItem('state', JSON.stringify(state));
  score(state.player.score);
}
