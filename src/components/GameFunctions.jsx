export const paintButtons = (array) => {
  const btnPrimary = 'btn-primary';
  const allLabels = document.querySelectorAll('label');
  const rightChoice = array.find((el) => typeof el === 'object');
  const correctIndex = array.indexOf(rightChoice);
  return allLabels.forEach((el) => {
    const id = el.id.replace('label', '');
    if (parseInt(id, 10) !== correctIndex) {
      el.classList.add('btn-danger', 'wrongAnswer');
      el.classList.remove(btnPrimary);
    }
    if (parseInt(id, 10) === correctIndex) {
      el.classList.add('btn-success', 'rightAnswer');
      el.classList.remove(btnPrimary);
    }
  });
};

export const nextQuestion = (setAnswer, index, questions, setIndex) => {
  const btnPrimary = 'btn-primary';
  setAnswer('');
  const label = document.querySelectorAll('label');
  const ele = document.querySelector('input:checked');
  label.forEach((el) => {
    el.classList.remove('btn-danger', 'btn-success', 'wrongAnswer', 'rightAnswer');
    el.classList.add(btnPrimary);
  });

  ele.checked = false;
  if (index < questions.length - 1) {
    return setIndex(index + 1);
  }
  return setIndex(0);
};
