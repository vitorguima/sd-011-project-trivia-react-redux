import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

const ButtonNext = ({ stateAnswers, indexNext, nextFunc, setSecond }) => {
  const history = useHistory();

  function nextButton() {
    const maxIndex = 4;
    const initialSecond = 30;
    if (indexNext < maxIndex) {
      nextFunc(indexNext + 1);
    } else if (indexNext === maxIndex) {
      history.push('/feedback');
    }
    setSecond(initialSecond);
  }

  const button = () => (
    <button
      type="button"
      data-testid="btn-next"
      onClick={ nextButton }
    >
      Próxima
    </button>
  );

  return stateAnswers && button();
};

export default ButtonNext;

ButtonNext.propTypes = {
  stateAnswers: PropTypes.bool.isRequired,
};
