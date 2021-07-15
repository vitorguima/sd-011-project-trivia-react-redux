import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Question.css';

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: true,
    });
  }

  render() {
    const {
      questions: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } } = this.props;
    const { clicked } = this.state;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <button
          className={ clicked && 'correct-answer' }
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
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
