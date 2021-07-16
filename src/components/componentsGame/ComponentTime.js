import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// https://ichi.pro/pt/criando-um-temporizador-de-contagem-regressiva-simples-usando-react-useref-hook-161277555118283

const ComponentTime = ({ stateButtonsEnable, correctAsw,
  idQuestion, cancelSomeScore, sendScore }) => {
  const initialTime = 30;
  const [second, setSecond] = useState(initialTime);
  const intervalRef = useRef();

  if (correctAsw) {
    const points = 10;
    const hard = 3;
    let score = 0;
    const { difficulty } = idQuestion;
    if (difficulty === 'hard') score += points + (second * hard);
    if (difficulty === 'medium') score += points + (second * 2);
    if (difficulty === 'easy') score += points + (second * 1);
    sendScore(score);
    cancelSomeScore(false);
  }

  const decreaseNum = () => setSecond(
    (prev) => {
      if (prev > 0) {
        return prev - 1;
      } return stateButtonsEnable(true);
    },
  );

  useEffect(() => {
    const interval = 1000;
    intervalRef.current = setInterval(decreaseNum, interval);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>{ second }</div>
  );
};

export default ComponentTime;

ComponentTime.propTypes = {
  stateButtonsEnable: PropTypes.func.isRequired,
  correctAsw: PropTypes.bool.isRequired,
  idQuestion: PropTypes.number.isRequired,
  cancelSomeScore: PropTypes.func.isRequired,
  sendScore: PropTypes.func.isRequired,
};
