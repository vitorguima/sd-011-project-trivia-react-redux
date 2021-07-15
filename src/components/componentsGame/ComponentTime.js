import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ComponentTime = ({ stateButtonsEnable }) => {
  // https://ichi.pro/pt/criando-um-temporizador-de-contagem-regressiva-simples-usando-react-useref-hook-161277555118283

  const initialTime = 30;
  const [second, setSecond] = useState(initialTime);
  const intervalRef = useRef();
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
    <div>
      { second }
    </div>
  );
};

export default ComponentTime;

ComponentTime.propTypes = {
  stateButtonsEnable: PropTypes.func.isRequired,
};
