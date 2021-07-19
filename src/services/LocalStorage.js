export function getPlayerLocalStorage() {
  return JSON.parse(localStorage.getItem('state'));
}

export function updateScoreLocalStorage(newState) {
  return localStorage.setItem('state', JSON.stringify(newState));
}

export async function createRanking(feedbackRanking) {
  const checkRanking = await JSON.parse(localStorage.getItem('ranking'));
  if (!checkRanking) {
    const arrayFeedback = [feedbackRanking];
    localStorage.setItem('ranking', JSON.stringify(arrayFeedback));
  } else {
    const currentRanking = await JSON.parse(localStorage.getItem('ranking'));
    const newRanking = [...currentRanking, feedbackRanking];
    return localStorage.setItem('ranking', JSON.stringify(newRanking));
  }
}
