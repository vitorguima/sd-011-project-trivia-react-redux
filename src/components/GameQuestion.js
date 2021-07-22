import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { resetCountdownTimer, stopCountdownTimer, updateScore } from '../actions';
import updateScoreRankingInLocalStorage from '../services/updateScoreRanking';

class GameQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { assertions: 0 };
    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  updateScore() {
    const CORRECT_SCORE = 10;
    const EASY_DIFFICULT = 1;
    const MEDIUM_DIFFICULT = 2;
    const HARD_DIFFICULT = 3;
    const {
      question: { difficulty }, timer, updateScoreAction, name, picture,
    } = this.props;

    let points = 0;
    switch (difficulty) {
    case 'easy':
      points = CORRECT_SCORE + (EASY_DIFFICULT * timer);
      break;
    case 'medium':
      points = CORRECT_SCORE + (MEDIUM_DIFFICULT * timer);
      break;
    case 'hard':
      points = CORRECT_SCORE + (HARD_DIFFICULT * timer);
      break;
    default:
      points = 0;
    }
    updateScoreRankingInLocalStorage(name, points, picture);
    updateScoreAction(points);
  }

  checkCorrectAnswer({ target }) {
    const { actionStopCountdown } = this.props;
    actionStopCountdown();
    const { dataset: { testid: answer } } = target;
    if (answer.includes('correct')) {
      this.updateScore();
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }));
    }
    target.classList.add('clicked');

    const father = target.parentElement;
    const nextQuestion = document.querySelector('.nextQuestion');
    const childs = [...father.children];
    childs.forEach((child) => {
      const { testid } = child.dataset;
      child.classList.add(testid);
      child.disabled = true;
    });
    nextQuestion.classList.add('visible');
  }

  render() {
    const { questionIndexAndRoute, question, isLoading, stopTimer } = this.props;
    const INDEX_TO_REDIRECT = 5;
    const LOADING = 'Carregando as perguntas';
    if (questionIndexAndRoute === INDEX_TO_REDIRECT) {
      return <Redirect to="feedback" />;
    }
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
}

const mapStateToProps = (state) => ({
  isLoading: state.game.loading,
  timer: state.cronometer.timer,
  stopTimer: state.cronometer.stopTimer,
  name: state.player.name,
  picture: state.player.picture,
});

const mapDispatchToProps = (dispatch) => ({
  actionStopCountdown: () => dispatch(stopCountdownTimer()),
  updateScoreAction: (points) => dispatch(updateScore(points)),
  actionResetTimer: () => dispatch(resetCountdownTimer()),
});

GameQuestion.propTypes = {
  questionIndexAndRoute: PropTypes.number.isRequired,
  question: PropTypes.arrayOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  stopTimer: PropTypes.func.isRequired,
  updateScoreAction: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  actionStopCountdown: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
