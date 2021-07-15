export const paintButtons = (array) => {
  const allButtons = document.querySelectorAll('button');
  const btnPrimary = 'btn-primary';
  const rightChoice = array.find((el) => typeof el === 'object');
  const correctIndex = array.indexOf(rightChoice);
  console.log(allButtons);
  return allButtons.forEach((el) => {
    const id = el.id.replace('question-', '');
    if (parseInt(id, 10) !== correctIndex) {
      el.classList.add('wrongAnswer');
      el.classList.remove(btnPrimary);
    }
    if (parseInt(id, 10) === correctIndex) {
      el.classList.add('rightAnswer');
      el.classList.remove(btnPrimary);
    }
  });
};

export const nextQuestion = (setAnswer, index, questions, setIndex) => {
  const allButtons = document.querySelectorAll('button');
  const btnPrimary = 'btn-primary';
  setAnswer('');
  allButtons.forEach((el) => {
    el.classList.remove('btn-danger', 'btn-success', 'wrongAnswer', 'rightAnswer');
    el.classList.add(btnPrimary);
  });
  const allChecked = document.querySelectorAll('input:disabled');
  if (allChecked) {
    allChecked.forEach((el) => el.removeAttribute('disabled'));
  }
  if (index < questions.length - 1) {
    return setIndex(index + 1);
  }
  return setIndex(0);
};

export const randomArray = (questions, setArray, index) => {
  if (questions) {
    const magic = 0.5;
    const wrongAnswers = questions[index].incorrect_answers;
    const correctAnswers = questions[index].correct_answer;
    let answers = Array.from(wrongAnswers);
    answers.push({ correct: correctAnswers });
    answers = answers.sort(() => Math.random() - magic);
    setArray(answers);
  }
};

export const addScore = (questions, index, answer, player, setPlayer, counter) => {
  const { correct_answer, difficulty } = questions[index];
  const difficultyLevels = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  if (answer === correct_answer) {
    const level = difficultyLevels[difficulty];
    const { assertions, score } = player.player;
    const ass = assertions + 1;
    const scr = score + (10 + counter * level);
    setPlayer({ ...player, player: { ...player.player, assertions: ass, score: scr } });
  }
};
