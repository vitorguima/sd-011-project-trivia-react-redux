import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startCountdown, stopCountdown } from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
    };
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  componentDidMount() {
    const { startCountdownAction } = this.props;
    startCountdownAction();
  }

  componentDidUpdate() {
    const { timer } = this.props;
    const { disabled } = this.state;
    if (timer <= 0 && disabled === false) {
      this.buttonClicked();
    //   stopCountdownAction();
    //   this.setState({
    //     disabled: true,
    //   });
    }
  }

  buttonClicked() {
    const { stopCountdownAction } = this.props;
    stopCountdownAction();
    this.setState({
      disabled: true,
    });
  }

  shufleAnswers(right, wrongs) {
    const max = 4;
    const random = Math.floor(Math.random() * max);
    wrongs.splice(random, 0, right);
    return wrongs;
  }

  multipleQuestion() {
    const { questionsArr, currentQuestion } = this.props;
    const { disabled } = this.state;
    const rightAnswer = (
      <button
        type="button"
        disabled={ disabled }
        data-testid="correct-answer"
        key="right"
        onClick={ this.buttonClicked }
      >
        { questionsArr[currentQuestion].correct_answer }
      </button>);
    const wrongAnswer = questionsArr[currentQuestion].incorrect_answers
      .map((item, index) => (
        <button
          type="button"
          disabled={ disabled }
          key={ `wrong-${index}` }
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.buttonClicked }
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
    const { disabled } = this.state;
    if (questionsArr[currentQuestion].correct_answer) {
      return (
        <div className="answers">
          <button
            type="button"
            disabled={ disabled }
            data-testid="correct-answer"
            onClick={ this.buttonClicked }
          >
            True
          </button>
          <button
            type="button"
            disabled={ disabled }
            data-testid="wrong-answer-0"
            onClick={ this.buttonClicked }
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
          disabled={ disabled }
          data-testid="wrong-answer-0"
          onClick={ this.buttonClicked }
        >
          True
        </button>
        <button
          type="button"
          disabled={ disabled }
          data-testid="correct-answer"
          onClick={ this.buttonClicked }
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
    const { questionsArr, currentQuestion, timer } = this.props;
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
        <h3>
          { timer }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.questions.questionsArr,
  currentQuestion: state.questions.currentQuestion,
  timer: state.questions.timer,
});

const mapDispatchToProps = (dispatch) => ({
  startCountdownAction: () => dispatch(startCountdown()),
  stopCountdownAction: () => dispatch(stopCountdown()),
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

export default connect(mapStateToProps, mapDispatchToProps)(Question);
