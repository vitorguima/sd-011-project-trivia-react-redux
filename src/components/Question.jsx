import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { nextQuestion as newQuestion } from '../actions';
import Counter from './Counter';
import '../styles/question.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      nextIsDisabled: true,
      redirectToFeedback: false,
      counter: 30,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDisabledButton = this.handleDisabledButton.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.returnNextButton = this.returnNextButton.bind(this);
  }

  componentDidMount() {
    const { counter } = this.props;
    counter();
  }

  handleNextQuestion() {
    const { nextQuestion, currentQuestion } = this.props;
    this.setState({
      nextIsDisabled: true,
    }, () => {
      const maxIndex = 4;
      if (currentQuestion === maxIndex) {
        this.setState({
          redirectToFeedback: true,
        });
      }
      nextQuestion();
    });
  }

  handleDisabledButton() {
    this.setState({
      nextIsDisabled: false,
    });
  }

  handleClick({ target }) {
    this.handleDisabledButton();
    const buttonArray = Array.from(target.parentNode.children);
    buttonArray.forEach((button) => {
      if (button.className === 'wrong-answer') {
        button.classList.add('wrong-color');
      } else if (button.className === 'correct-answer') {
        button.classList.add('correct-color');
      }
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
    const { nextIsDisabled, redirectToFeedback } = this.state;
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
            className="correct-answer"
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
              className="wrong-answer"
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              {answer}
            </button>
          ))}
          { disabled || !nextIsDisabled ? this.returnNextButton() : null }
        </div>
        {/* <Counter /> */}
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
  count: PropTypes.number.isRequired,
  resetCounter: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
