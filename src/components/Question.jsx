import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Question.css';

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      seconds: 31,
      disableBtn: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.countDown();
  }

  handleClick() {
    this.setState({
      clicked: true,
    });
  }

  countDown() {
    const second = 1000;
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
      setTimeout(this.countDown, second);
    }
    if (seconds === 0) {
      this.setState({
        disableBtn: true,
      });
    }
  }

  render() {
    const {
      questions: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } } = this.props;
    const { clicked, seconds, disableBtn } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <button
          className={ clicked && 'correct-answer' }
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
          disabled={ disableBtn }
        >
          {correctAnswer}
        </button>
        { incorrectAnswers.map((answer, index) => (
          <button
            className={ clicked && 'wrong-answer' }
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            onClick={ this.handleClick }
            disabled={ disableBtn }
          >
            {answer}
          </button>)) }
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
