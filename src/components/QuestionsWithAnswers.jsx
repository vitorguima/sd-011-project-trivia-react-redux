import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Score from './Score';

import CategoryAndQuestion from './CategoryAndQuestion';

import './Questions.css';

class QuestionsWithAnswers extends Component {
  // constructor() {
  //   super();
  //   // this.state = {
  //   //   click: false,
  //   // };
  //   // this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
  // }

  // handleScoreUpdate() {
  //   this.setState({ click: true });
  // }

  render() {
    const {
      isRedBordered, isGreenBordered, incorrectAnswer,
      correctAnswer, isHidden, gameResults,
      counter, nextBtn, handleAnswer,
      isDisabled, count } = this.props;
    // const { click } = this.state;
    return (
      <div>
        <CategoryAndQuestion
          gameResults={ gameResults }
          counter={ counter }
        />
        <Score Result={ gameResults } score={ counter } count={ count } click={ isHidden } />
        <button
          data-testid="correct-answer"
          name="correct"
          type="button"
          className={ isGreenBordered }
          onClick={ handleAnswer }
          disabled={ isDisabled }
          // onMouseDown={ () => this.handleScoreUpdate() }
          // onMouseUp={ () => this.setState({ click: false }) }
        >
          { correctAnswer }
        </button>
        { incorrectAnswer && incorrectAnswer.map((value, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            name="incorrect"
            type="button"
            className={ isRedBordered }
            key={ index }
            onClick={ handleAnswer }
            disabled={ isDisabled }
          >
            {value}
          </button>
        ))}
        <button
          data-testid="btn-next"
          type="button"
          hidden={ isHidden }
          onClick={ nextBtn }
        >
          Próxima
        </button>
      </div>
    );
  }
}

QuestionsWithAnswers.propTypes = ({
  incorrectAnswer: PropTypes.arrayOf().isRequired,
  correctAnswer: PropTypes.string.isRequired,
  nextBtn: PropTypes.func.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  gameResults: PropTypes.objectOf().isRequired,
  isRedBordered: PropTypes.string.isRequired,
  isGreenBordered: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
});

export default QuestionsWithAnswers;
