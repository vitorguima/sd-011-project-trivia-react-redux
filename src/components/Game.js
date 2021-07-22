import React, { Component } from 'react';
import './Game.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cronometer from './Cronometer';
import GameQuestion from './GameQuestion';
import { resetCountdownTimer } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  handleNextQuestion() {
    const MAX_QUESTION = 4;
    const { actionResetTimer } = this.props;
    actionResetTimer();

    this.setState((prevState) => (prevState === MAX_QUESTION
      ? { questionIndex: prevState.questionIndex + 1 }
      : { questionIndex: prevState.questionIndex + 1 }));

    const nextQuestion = document.querySelector('.nextQuestion');
    nextQuestion.classList.remove('visible');

    const father = document.querySelector('.alternativesContainer');
    const childs = [...father.children];
    childs.forEach((child) => {
      const { testid } = child.dataset;
      child.classList.remove('clicked');
      child.classList.toggle(testid);
      child.disabled = false;
    });
  }

  render() {
    const { questionIndex } = this.state;
    const { questions, error } = this.props;
    const errorTrue = 'Token expirado, por favor faça o login novamente';
    return (
      <div className="gameContainer">
        <h1 className="questionTitle">Pergunta:</h1>
        <Cronometer questionIndex={ questionIndex } />
        <span className="loadingBar" />
        { error
          ? errorTrue
          : (
            <GameQuestion
              questionIndexAndRoute={ questionIndex }
              question={ questions[questionIndex] }
            />
          )}
        <button
          type="button"
          className="nextQuestion"
          data-testid="btn-next"
          onClick={ this.handleNextQuestion }
        >
          Próxima Pergunta
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  error: state.game.error,
});

const mapDispatchToProps = (dispatch) => ({
  actionResetTimer: () => dispatch(resetCountdownTimer()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  error: PropTypes.bool.isRequired,
  actionResetTimer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
