import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class AnswerButtons extends Component {
  constructor(props) {
    super(props);

    this.setScorePoint = this.setScorePoint.bind(this);
    this.verifyIfWasAnswered = this.verifyIfWasAnswered.bind(this);
  }

  setScorePoint(answerSelected, correctAnswer) {
    // Marca ponto ao acertar a resposta, precisa pegar o tempo, e a dificuldade da pergunta
    const { setScore, results, questionIndex, secondsToFinish } = this.props;
    const { difficulty } = results[questionIndex];
    const question = questionIndex + 1;
    let score = 0;
    if (answerSelected === correctAnswer) {
      score = 1;
    }

    const time = secondsToFinish;

    const answerOfUser = {
      questionNumber: question,
      time,
      score,
      difficulty,
    };
    setScore(answerOfUser);
  }

  getTimeResponse() {
    // Pega o tempo restante após o jogador selecionar uma resposta
  }

  verifyIfWasAnswered() {
    const { answerObserver } = this.props;
    answerObserver();
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
          id="answer"
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
          } }
          onChange={ secondsToFinish === 0 ? colorizeAnswers() : null }
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
  wasAnswered: state.questionHandlers.wasAnswered,
  questionIndex: state.questionHandlers.questionIndex,
  results: state.fetchReducers.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  answerObserver: () => dispatch(userActions.answerObserver()),
  setScore: (score) => dispatch(userActions.setScore(score)),
  setTimeScore: (seconds) => dispatch(userActions.setTimeScore(seconds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerButtons);

AnswerButtons.propTypes = {
  seconds: PropTypes.number,
  key: PropTypes.string,
  answer: PropTypes.string,
  correctAnswer: PropTypes.number,
  onClick: PropTypes.number,
}.isRequired;
