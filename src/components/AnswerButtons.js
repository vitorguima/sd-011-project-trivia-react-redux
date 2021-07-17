import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class AnswerButtons extends Component {
  constructor(props) {
    super(props);

    this.verifyIfWasAnswered = this.verifyIfWasAnswered.bind(this);
  }

  verifyIfWasAnswered() {
    const { answerObserver } = this.props;
    answerObserver();
  }

  render() {
    const { seconds, key, answer, correctAnswer, onClick } = this.props;
    return (
      <section>
        <button
          id="answer"
          type="button"
          disabled={ (seconds === 0 || false) }
          key={ key }
          data-testid={ correctAnswer === answer
            ? 'correct-answer'
            : 'wrong-answer' }
          onClick={ () => { onClick(); this.verifyIfWasAnswered(); } }
          className="answer"
        >
          { answer }
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  seconds: state.getSeconds.seconds,
  questionCounter: state.question.questionCounter,
});

const mapDispatchToProps = (dispatch) => ({
  answerObserver: () => dispatch(userActions.answerObserver()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerButtons);

AnswerButtons.propTypes = {
  seconds: PropTypes.number,
  key: PropTypes.string,
  answer: PropTypes.string,
  correctAnswer: PropTypes.number,
  onClick: PropTypes.number,
}.isRequired;
