import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nextIndex } from '../actions/gameActions';

export default function NextQuestionButton() {
  const history = useHistory();
  const gameState = useSelector((state) => state.game);
  const { allQuestions, index } = gameState;
  const dispatch = useDispatch();

  const changeIndex = () => {
    if (index < allQuestions.length - 1) {
      return dispatch(nextIndex());
    }

    history.push('/feedback');
  };

  return (
    <button
      type="button"
      onClick={ () => changeIndex() }
      // setCount(true);
      // setCounter(time);

      className="btn btn btn-info btn-lg nextQuestion"
      data-testid="btn-next"
    >
      Próxima pergunta
    </button>
  );
}

NextQuestionButton.propTypes = {
  index: PropTypes.number.isRequired,
  questions: PropTypes.objectOf(PropTypes.object).isRequired,
  arrayQuestions: PropTypes.shape({}).isRequired,
  setCount: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  setCounter: PropTypes.func.isRequired,
  setAnswer: PropTypes.func.isRequired,

};
