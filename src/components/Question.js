import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends Component {
  shufleAnswers(right, wrongs) {
    const max = 4;
    const random = Math.floor(Math.random() * max);
    wrongs.splice(random, 0, right);
    console.log(wrongs);
    return wrongs;
  }

  disableButton() {
    const buttons = document.getElementsByClassName('button');
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].disabled = true;
    }
  }

  multipleQuestion() {
    const { questionsArr, currentQuestion } = this.props;
    const rightAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        key="right"
        className="button"
        onClick={ this.disableButton }
      >
        { questionsArr[currentQuestion].correct_answer }
      </button>);
    const wrongAnswer = questionsArr[currentQuestion].incorrect_answers
      .map((item, index) => (
        <button
          type="button"
          key={ `wrong-${index}` }
          data-testid={ `wrong-answer-${index}` }
          className="button"
          onClick={ this.disableButton }
        >
          { item }
        </button>
      ));
    const shufledAnswer = this.shufleAnswers(rightAnswer, wrongAnswer);
    return (
      <div className="answers">
        { shufledAnswer }
      </div>
    );
  }

  bolleanQuestion() {
    const { questionsArr, currentQuestion } = this.props;
    if (questionsArr[currentQuestion].correct_answer) {
      return (
        <div className="answers">
          <button
            type="button"
            data-testid="correct-answer"
            className="button"
            onClick={ this.disableButton }
          >
            True
          </button>
          <button
            type="button"
            data-testid="wrong-answer-0"
            className="button"
            onClick={ this.disableButton }
          >
            False
          </button>
        </div>
      );
    }
    return (
      <div className="answers">
        <button
          type="button"
          data-testid="wrong-answer-0"
          className="button"
          onClick={ this.disableButton }
        >
          True
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          className="button"
          onClick={ this.disableButton }
        >
          False
        </button>
      </div>
    );
  }

  renderAwnserButtons() {
    const { questionsArr, currentQuestion } = this.props;
    if (questionsArr[currentQuestion].type === 'boolean') {
      return this.bolleanQuestion();
    }
    return this.multipleQuestion();
  }

  render() {
    const { questionsArr, currentQuestion } = this.props;
    return (
      <div>
        <p data-testid="question-text">
          {' '}
          { questionsArr[currentQuestion].question }
          {' '}
        </p>
        <p data-testid="question-category">
          {' '}
          { questionsArr[currentQuestion].category }
          {' '}
        </p>
        { this.renderAwnserButtons() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.questions.questionsArr,
  currentQuestion: state.questions.currentQuestion,
});

Question.propTypes = {
  questionsArr: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Question);
