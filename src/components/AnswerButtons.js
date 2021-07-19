import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class AnswerButtons extends Component {
  constructor(props) {
    super(props);

    this.stopTimer = this.stopTimer.bind(this);
    this.verifyIfWasAnswered = this.verifyIfWasAnswered.bind(this);
  }

  setScore(answerSelected, correctAnswer) {
    // Marca ponto ao acertar a resposta
    const { setScore } = this.props;
    if (answerSelected === correctAnswer) {
      setScore(1);
    }
  }

  getTimeResponse() {
    // Pega o tempo restante após o jogador selecionar uma resposta
  }

  stopTimer() {
    // Parar o tempo após selecionar uma resposta
  }

  verifyIfWasAnswered() {
    const { answerObserver } = this.props;
    answerObserver();
  }

  render() {
    const { seconds,
      key,
      answer,
      correctAnswer,
      colorizeAnswers,
      wasAnswered,
    } = this.props;
    return (
      <section>
        <button
          id="answer"
          type="button"
          disabled={ wasAnswered || seconds === 0 }
          key={ key }
          data-testid={ correctAnswer === answer
            ? 'correct-answer'
            : 'wrong-answer' }
          onClick={ () => {
            colorizeAnswers();
            this.verifyIfWasAnswered();
            this.setScore(answer, correctAnswer);
          } }
          onChange={ seconds === 0 ? colorizeAnswers() : null }
          className="answer"
        >
          { answer }
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  seconds: state.timeOver.seconds,
  wasAnswered: state.gameScore.wasAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  answerObserver: () => dispatch(userActions.answerObserver()),
  setScore: (point) => dispatch(userActions.setScore(point)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerButtons);

AnswerButtons.propTypes = {
  seconds: PropTypes.number,
  key: PropTypes.string,
  answer: PropTypes.string,
  correctAnswer: PropTypes.number,
  onClick: PropTypes.number,
}.isRequired;
