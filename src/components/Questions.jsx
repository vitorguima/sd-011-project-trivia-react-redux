import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserScore } from '../actions/user';

import QuestionTitle from './QuestionTitle';

import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
    this.handleAlternativeButtons = this.handleAlternativeButtons.bind(this);
    this.handleConvertDifficulty = this.handleConvertDifficulty.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  // !Converte string com a dificuldade em numero
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
    const { score } = this.state;
    const { counter } = this.props;
    this.setState({
      score: score + number
      + (counter * this.handleConvertDifficulty(difficulty)),
    });
  }

  handleAlternativeButtons() {
    const {
      isRedBordered,
      isGreenBordered,
      incorrectAnswer,
      correctAnswer,
      isHidden,
      nextBtn,
      handleAnswer,
      isDisabled,
      difficulty,
    } = this.props;
    return (
      <div>
        <button
          data-testid="correct-answer"
          name="correct"
          type="button"
          className={ isGreenBordered }
          onClick={ handleAnswer }
          disabled={ isDisabled }
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
          onMouseDown={ () => this.handleScore(difficulty) }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const {
      difficulty,
      gameResults,
      counter,
    } = this.props;
    return (
      <div>
        <QuestionTitle
          gameResults={ gameResults }
          counter={ counter }
          difficulty={ difficulty }
        />
        {this.handleAlternativeButtons()}
      </div>
    );
  }
}

const mapDispachToProps = (dispatch) => ({
  getScore: (state) => dispatch(getUserScore(state)),
});

Questions.propTypes = ({
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
  difficulty: PropTypes.string.isRequired,
});

export default connect(null, mapDispachToProps)(Questions);
