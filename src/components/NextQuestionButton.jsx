import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nextQuestion } from './GameFunctions';

const time = 5;

export default function NextQuestionButton(props) {
  const {
    setAnswer,
    index,
    questions,
    setIndex,
    setCount,
    setCounter,
  } = props;
  const history = useHistory();
  const feedbackTransitor = (v) => {
    if (v === questions.length - 1) {
      history.push('feedback');
    }
  };

  return (
    <button
      type="button"
      onClick={ () => {
        nextQuestion(setAnswer, index, questions, setIndex);
        feedbackTransitor(index);
        setCount(true);
        setCounter(time);
      } }
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
