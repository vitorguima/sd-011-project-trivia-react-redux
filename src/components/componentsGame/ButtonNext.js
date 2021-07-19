import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';

const ButtonNext = ({ stateAnswers, indexNext, nextFunc, setSecond }) => {
  const history = useHistory();
  const { name, score, gravatarEmail } = useSelector(({ userInfo }) => userInfo.player);
  const setRanking = () => {
    const userData = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
    };
    console.log(localStorage.getItem('ranking'));
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([userData]));
    } else {
      const ranking = JSON.parse(localStorage.getItem('ranking'));

      ranking.push(userData);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  };

  function nextButton() {
    const maxIndex = 4;
    const initialSecond = 30;
    if (indexNext < maxIndex) {
      nextFunc(indexNext + 1);
    } else if (indexNext === maxIndex) {
      history.push('/feedback');
      setRanking();
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
