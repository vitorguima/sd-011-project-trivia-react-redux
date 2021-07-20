export default function updateRanking(imageURL) {
  const retrievePlayerInfo = JSON.parse(localStorage.getItem('state'));
  const { player: { name, score } } = retrievePlayerInfo;
  let ranking = localStorage.getItem('ranking');
  if (!ranking) {
    ranking = [
      {
        name,
        score,
        picture: imageURL,
      },
    ];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  } else {
    const currPlayer = {
      name,
      score,
      picture: imageURL,
    };
    const newRank = JSON.parse(ranking);
    newRank.push(currPlayer);
    newRank.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(newRank));
  }
}
