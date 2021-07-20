import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class AnswerButtons extends Component {
  constructor(props) {
    super(props);
    this.setNewScoreInLocalStorage = this.setNewScoreInLocalStorage.bind(this);
    this.convertDifficultyToPoint = this.convertDifficultyToPoint.bind(this);
    this.setScorePoint = this.setScorePoint.bind(this);
    this.verifyIfWasAnswered = this.verifyIfWasAnswered.bind(this);
  }

  setNewScoreInLocalStorage(score) {
    console.log(`setNewScoreInLocalStorage ${score}`);
    let assert = 0;
    if (score > 0) {
      assert = 1;
    }
    const objString = localStorage.getItem('state');
    const { player } = JSON.parse(objString);
    const playerScore = { player: {
      name: player.name,
      assertions: player.assertions + assert,
      score: player.score + score,
      gravatarEmail: player.gravatarEmail,
    } };
    localStorage.setItem('state', JSON.stringify(playerScore));
  }

  setScorePoint(answerSelected, correctAnswer) {
    const { difficulty } = this.props;
    let points = 0;
    if ((answerSelected === correctAnswer) && answerSelected) {
      const score = 10;
      const difficultyPoint = this.convertDifficultyToPoint(difficulty);
      const { secondsToFinish } = this.props;
      points = score + (secondsToFinish * difficultyPoint);
    }
    console.log(`setScorePoint ${points}`);
    this.setNewScoreInLocalStorage(points);
    return points;
  }

  verifyIfWasAnswered() {
    const { answerObserver } = this.props;
    answerObserver();
  }

  convertDifficultyToPoint(difficult) {
    const easyDif = 1;
    const mediumDif = 2;
    const hardDif = 3;
    switch (difficult) {
    case 'easy':
      return easyDif;
    case 'medium':
      return mediumDif;
    case 'hard':
      return hardDif;
    default:
      return 0;
    }
  }

  render() {
    const { secondsToFinish,
      key,
      answer,
      correctAnswer,
      colorizeAnswers,
      wasAnswered,
    } = this.props;
    return (
      <section>
        <button
          name="answer"
          type="button"
          disabled={ wasAnswered || secondsToFinish === 0 }
          key={ key }
          data-testid={ correctAnswer === answer
            ? 'correct-answer'
            : 'wrong-answer' }
          onClick={ () => {
            colorizeAnswers();
            this.verifyIfWasAnswered();
            this.setScorePoint(answer, correctAnswer);
            colorizeAnswers();
          } }
          className="answer"
        >
          { answer }
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  secondsToFinish: state.timeHandler.secondsToFinish,
  secondsScore: state.timeHandler.secondsScore,
  wasAnswered: state.questionHandlers.wasAnswered,
  questionIndex: state.questionHandlers.questionIndex,
  results: state.fetchReducers.questions.results,
  gameScore: state.gameScore,
});

const mapDispatchToProps = (dispatch) => ({
  answerObserver: () => dispatch(userActions.answerObserver()),
  setScore: (score) => dispatch(userActions.setScore(score)),
  setTimeScore: (seconds) => dispatch(userActions.setTimeScore(seconds)),
  setSecondsToFinish: (seconds) => dispatch(userActions.setSecondsToFinish(seconds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerButtons);

AnswerButtons.propTypes = {
  seconds: PropTypes.number,
  key: PropTypes.string,
  answer: PropTypes.string,
  correctAnswer: PropTypes.number,
  onClick: PropTypes.number,
}.isRequired;
