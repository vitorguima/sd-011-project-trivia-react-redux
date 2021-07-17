import React, { Component } from 'react';
import { connect } from 'react-redux';

class AnswerButtons extends Component {
  render() {
    const { seconds, key, answer, correctAnswer, onClick } = this.props;
    return (
      <button
        id="answer"
        type="button"
        disabled={ (seconds === 0 || false) }
        key={ key }
        data-testid={ correctAnswer === answer
          ? 'correct-answer'
          : 'wrong-answer' }
        onClick={ () => { onClick() } }
        className="answer"
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  seconds: state.getSeconds.seconds,
});

export default connect(mapStateToProps)(AnswerButtons);
