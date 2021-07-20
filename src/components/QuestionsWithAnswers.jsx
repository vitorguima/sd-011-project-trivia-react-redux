import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserScore } from '../actions/user';

import CategoryAndQuestion from './CategoryAndQuestion';

import './Questions.css';

class QuestionsWithAnswers extends Component {
  constructor() {
    super();
    this.state = {
      totalScore: 0,
    };
    this.handleConvertDifficulty = this.handleConvertDifficulty.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleScoreCanBeUpdated = this.handleScoreCanBeUpdated.bind(this);
  }

  // *Converte string com a dificuldade em numero
  handleConvertDifficulty(difficulty) {
    const numbers = { one: 1, two: 2, three: 3 }; // Uma forma para salvar os números dentro de uma constante
    const { one, two, three } = numbers;
    if (difficulty === 'easy') return one;
    if (difficulty === 'medium') return two;
    if (difficulty === 'hard') return three;
  }

  // !Calcula a quantidade total de pontos
  handleScore(difficulty) {
    const number = 10; // Não é recomendado que use o numero direto, mas sim dentro de uma constante
    const difficultyPoints = this.handleConvertDifficulty(difficulty);
    const { counter } = this.props;
    this.setState((old) => ({
      totalScore: old.totalScore + number
      + (counter * difficultyPoints),
    }));
  }

  handleScoreCanBeUpdated() {
    const { count, gameResults } = this.props;
    const magicNumber = 4;
    if (count > magicNumber) {
      console.log(count);
      return this.handleScore(gameResults.difficulty);
    }
  }

  render() {
    const {
      isRedBordered, isGreenBordered, incorrectAnswer,
      correctAnswer, isHidden, gameResults,
      counter, nextBtn, handleAnswer,
      isDisabled, submitScore } = this.props;
    const { totalScore } = this.state;
    return (
      <div>
        <CategoryAndQuestion
          gameResults={ gameResults }
          counter={ counter }
        />
        <button
          data-testid="correct-answer"
          name="correct"
          type="button"
          className={ isGreenBordered }
          onClick={ handleAnswer }
          disabled={ isDisabled }
          onMouseDown={ () => this.handleScoreCanBeUpdated() }
          onMouseUp={ () => submitScore(totalScore) }
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

const mapDispachToProps = (dispatch) => ({
  submitScore: (state) => dispatch(getUserScore(state)),
});

QuestionsWithAnswers.propTypes = ({
  incorrectAnswer: PropTypes.arrayOf().isRequired,
  correctAnswer: PropTypes.string.isRequired,
  nextBtn: PropTypes.func.isRequired,
  submitScore: PropTypes.func.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  gameResults: PropTypes.objectOf().isRequired,
  isRedBordered: PropTypes.string.isRequired,
  isGreenBordered: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
});

export default connect(null, mapDispachToProps)(QuestionsWithAnswers);
