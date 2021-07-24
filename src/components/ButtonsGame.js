import React from 'react';
import PropTypes from 'prop-types';
import '../style/GamePage.style.css';

export default function ButtonsGame({
  results, questionIndex, click, disableBtnByTime, upDateScore, clickAnswer, scoreUpdate,
}) {
  function answBtnCreator() {
    const result = results[questionIndex];
    const btnCorrectAnsw = (
      <button
        key="correct-answer"
        className={ click ? 'rightAnswer' : 'answers btn' }
        onClick={ () => {
          clickAnswer();
          upDateScore(scoreUpdate());
        } }
        type="button"
        data-testid="correct-answer"
        disabled={ disableBtnByTime || click }
      >
        {result.correct_answer}
      </button>);

    const btnWrngAnsw = [...result.incorrect_answers.map((wrngAnsw, index) => (
      <button
        key={ index }
        onClick={ () => clickAnswer() }
        className={ click ? 'wrongAnswer' : `answers${index} btn` }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        disabled={ disableBtnByTime || click }
      >
        {wrngAnsw}
      </button>))];
    // const randomNb = 0.5;
    const allBtns = [...btnWrngAnsw, btnCorrectAnsw];
    // .sort(() => Math.random() - randomNb);
    return allBtns;
  }

  return (
    <section className="answ-btn">
      {results && answBtnCreator()}
    </section>
  );
}

ButtonsGame.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  disableBtnByTime: PropTypes.bool.isRequired,
  click: PropTypes.bool.isRequired,
  upDateScore: PropTypes.func.isRequired,
  questionIndex: PropTypes.number.isRequired,
  clickAnswer: PropTypes.func.isRequired,
  scoreUpdate: PropTypes.func.isRequired,
};
