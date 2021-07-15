import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ButtonsQuestions = ({ descQuestion, btnEnable, funcAnswersYes }) => {
  const { incorrect_answers: incorrectAnswers,
    correct_answer: correctAsw } = descQuestion;
  const [state, setState] = useState({ correctAnswer: '', wrongAnswer: '' });
  const setClassName = () => {
    setState({ correctAnswer: 'correct-answer', wrongAnswer: 'wrong-answer' });
    funcAnswersYes(true);
  };
  return (
    <>
      <button
        onClick={ () => setClassName() }
        disabled={ btnEnable }
        className={ state.correctAnswer }
        type="button"
        data-testid="correct-answer"
      >
        { correctAsw }
      </button>
      { incorrectAnswers.map((incorrects, index) => (
        <button
          onClick={ () => setClassName() }
          disabled={ btnEnable }
          className={ state.wrongAnswer }
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${index}` }
        >
          { incorrects }
        </button>)) }
    </>
  );
};

export default ButtonsQuestions;

ButtonsQuestions.propTypes = {
  descQuestion: PropTypes.shape({
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
  }).isRequired,
  btnEnable: PropTypes.bool.isRequired,
  funcAnswersYes: PropTypes.func.isRequired,
};
