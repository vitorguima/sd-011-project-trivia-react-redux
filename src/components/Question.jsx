import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { nextQuestion as newQuestion } from '../actions';
import '../styles/question.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      nextIsDisabled: true,
      redirectToFeedback: false,
      isAnswered: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDisabledButton = this.handleDisabledButton.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.returnNextButton = this.returnNextButton.bind(this);
  }

  handleNextQuestion() {
    const { nextQuestion, currentQuestion, reset } = this.props;
    this.setState({
      nextIsDisabled: true,
      isAnswered: false,
    }, () => {
      const maxIndex = 4;
      if (currentQuestion === maxIndex) {
        this.setState({
          redirectToFeedback: true,
        });
      }
      nextQuestion();
      reset();
    });
  }

  handleDisabledButton() {
    this.setState({
      nextIsDisabled: false,
    });
  }

  handleClick() {
    const { clearInterval } = this.props;
    clearInterval();
    this.handleDisabledButton();
    this.setState({
      isAnswered: true,
    });
  }

  returnNextButton() {
    return (
      <button
        type="button"
        onClick={ this.handleNextQuestion }
        data-testid="btn-next"
      >
        PRÓXIMA
      </button>
    );
  }

  render() {
    const { nextIsDisabled, redirectToFeedback, isAnswered } = this.state;
    const { question: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    }, disabled } = this.props;
    return (
      <div>
        { redirectToFeedback && <Redirect to="/feedback" /> }
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div>
          <button
            type="button"
            data-testid="correct-answer"
            className={ isAnswered ? 'correct-color' : null }
            onClick={ this.handleClick }
            disabled={ disabled }
          >
            {correctAnswer}
          </button>
          {incorrectAnswers.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid="wrong-answer"
              className={ isAnswered ? 'wrong-color' : null }
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              {answer}
            </button>
          ))}
          { disabled || !nextIsDisabled ? this.returnNextButton() : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  currentQuestion: gameReducer.currentQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(newQuestion()),
});

Question.propTypes = ({
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  // count: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  clearInterval: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
