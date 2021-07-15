import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { nextQuestion as newQuestion } from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      nextIsDisabled: true,
      redirectToFeedback: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDisabledButton = this.handleDisabledButton.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.checkLastQuestion = this.checkLastQuestion.bind(this);
  }

  handleNextQuestion() {
    const { nextQuestion } = this.props;
    this.setState({
      nextIsDisabled: true,
    }, () => {
      this.checkLastQuestion();
      nextQuestion();
    });
  }

  handleDisabledButton() {
    this.setState({
      nextIsDisabled: false,
    });
  }

  checkLastQuestion() {
    const { currentQuestion } = this.props;
    const maxIndex = 4;
    if (currentQuestion > maxIndex) {
      this.setState({
        redirectToFeedback: true,
      });
    }
  }

  handleClick({ target }) {
    this.handleDisabledButton();
    this.checkLastQuestion();
    const buttonArray = Array.from(target.parentNode.children);
    buttonArray.forEach((button) => {
      if (button.className === 'wrong-answer') {
        button.classList.add('wrong-color');
      } else if (button.className === 'correct-answer') {
        button.classList.add('correct-color');
      }
    });
  }

  render() {
    const { nextIsDisabled, redirectToFeedback } = this.state;
    const { question: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;
    return (
      <div>
        { redirectToFeedback && <Redirect to="/feedback" /> }
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div>
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.handleClick }
          >
            {correctAnswer}
          </button>
          {incorrectAnswers.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid="wrong-answer"
              onClick={ this.handleClick }
            >
              {answer}
            </button>
          ))}
          <button
            type="button"
            onClick={ this.handleNextQuestion }
            disabled={ nextIsDisabled }
          >
            PRÓXIMA
          </button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
