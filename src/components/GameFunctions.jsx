const magicTen = 10;

export const paintButtons = (array) => {
  const allButtons = document.querySelectorAll('button');
  const btnPrimary = 'btn-primary';
  const rightChoice = array.find((el) => typeof el === 'object');
  const correctIndex = array.indexOf(rightChoice);
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
  const allChecked = document.querySelectorAll('button:disabled');
  if (allChecked) {
    allChecked.forEach((el) => el.removeAttribute('disabled'));
  }
  if (index < questions.length - 1) {
    return setIndex(index + 1);
  }
  return setIndex(0);
};

export const randomArray = (incorrectAnswers, correctAnswer) => {
  const alternatives = Array.from([...incorrectAnswers, correctAnswer]);
  const magic = 0.5;
  const sortedArray = alternatives.sort(() => Math.random() - magic);
  return sortedArray;
};

export const addScore = ({ ...props }) => {
  const { questions, index, answer, player, setPlayer, counter } = props;
  const correctAnswer = questions[index].correct_answer;
  const { difficulty } = questions[index];
  const difficultyLevels = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  if (answer === correctAnswer) {
    const level = difficultyLevels[difficulty];
    const { assertions, score } = player.player;
    const ass = assertions + 1;
    console.log(counter);
    const scr = score + (magicTen + (counter * level));
    console.log(scr);
    setPlayer({ ...player, player: { ...player.player, assertions: ass, score: scr } });
  }
};
