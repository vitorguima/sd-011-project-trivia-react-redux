const INCORRECT = '#incorrect-answear';
const CORRECT = '#correct-answear';

function changeBorderColor() {
  const wrong = document.querySelectorAll(INCORRECT);
  const correct = document.querySelector(CORRECT);
  wrong.forEach((element) => {
    element.style.border = '3px solid rgb(255, 0, 0)';
  });
  correct.style.border = '3px solid rgb(6, 240, 15)';
}

function disableBtnsAfterTimer() {
  const wrong = document.querySelectorAll(INCORRECT);
  const correct = document.querySelector(CORRECT);
  wrong.forEach((element) => {
    element.disabled = true;
  });
  correct.disabled = true;
}

function allowAbleBtnsAfterNextClick() {
  const wrong = document.querySelectorAll(INCORRECT);
  const correct = document.querySelector(CORRECT);
  wrong.forEach((element) => {
    element.disabled = false;
  });
  correct.disabled = false;
}

export {
  changeBorderColor,
  disableBtnsAfterTimer,
  allowAbleBtnsAfterNextClick,
};
