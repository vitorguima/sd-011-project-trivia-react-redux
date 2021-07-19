import React, { Component } from 'react';
import './Game.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cronometer from './Cronometer';
import { stopCountdownTimer } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      assertions: 0,
    };
    this.gameQuestions = this.gameQuestions.bind(this);
    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  updateScore() {
    console.log('olá');
    // const CORRECT_SCORE = 10;
    // const EASY_DIFFICULT = 1;
    // const MEDIUM_DIFFICULT = 2;
    // const HARD_DIFFICULT = 3;
    // const { questions, timer } = this.props;
    // const { questionIndex } = this.state;
    // const { difficulty } = questions[questionIndex];

    // let points = 0;
    // switch (difficulty) {
    // case 'easy':
    //   points = CORRECT_SCORE + (EASY_DIFFICULT * timer);
    //   break;
    // case 'medium':
    //   points = CORRECT_SCORE + (MEDIUM_DIFFICULT * timer);
    //   break;
    // case 'hard':
    //   points = CORRECT_SCORE + (HARD_DIFFICULT * timer);
    //   break;
    // default:
    //   points = 0;
    // }
  }

  checkCorrectAnswer({ target }) {
    const { dataset: { testid: answer } } = target;
    if (answer.includes('correct')) {
      this.updateScore();
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }));
    }
    target.classList.add('clicked');

    const father = target.parentElement;
    const childs = [...father.children];
    childs.forEach((child) => {
      const { testid } = child.dataset;
      child.classList.add(testid);
      child.disabled = true;
    });
  }

  gameQuestions() {
    const { questionIndex } = this.state;
    const { questions, isLoading } = this.props;
    const LOADING = 'Carregando as perguntas';
    const question = questions[questionIndex];
    const alternatives = [...question.incorrect_answers, question.correct_answer];
    // http://www.buginit.com/javascript/javascript-sort-without-mutating-array/
    const alternativesToSort = alternatives.concat().sort();
    const correctAnswer = question.correct_answer;

    return (
      <div>
        <p
          className="question-category"
          data-testid="question-category"
        >
          { question.category }
        </p>
        <p className="question" data-testid="question-text">{ question.question }</p>
        <div className="alternativesContainer">
          { isLoading ? LOADING : alternativesToSort.map((alternative) => {
            const index = alternatives.indexOf(alternative);
            const { stopTimer } = this.props;
            return (
              <button
                key={ index }
                type="button"
                disabled={ stopTimer }
                onClick={ this.checkCorrectAnswer }
                data-testid={ alternative === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
              >
                { alternative }
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { error } = this.props;
    const errorTrue = 'Token expirado, por favor faça o login novamente';
    return (
      <div className="gameContainer">
        <h1 className="questionTitle">Pergunta:</h1>
        <Cronometer />
        <span className="loadingBar" />
        { error ? errorTrue : this.gameQuestions() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions,
  error: state.playerReducer.error,
  isLoading: state.playerReducer.loading,
  timeRemaining: state.timerReducer.timer,
  stopTimer: state.timerReducer.stopTimer,
});

const mapDispatchToProps = (dispatch) => ({
  actionStopCountdown: () => dispatch(stopCountdownTimer()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
