export default function handleStyleAnswers() {
  const styleAnswers = document.getElementsByName('answer');
  styleAnswers.forEach((answerBtn) => {
    if (answerBtn.getAttribute('data-testid') === 'correct-answer') {
      answerBtn.style = 'border: 3px solid rgb(6, 240, 15)';
    } else {
      answerBtn.style = 'border: 3px solid rgb(255, 0, 0)';
    }
  });
}
