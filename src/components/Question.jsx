import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/question.css';

export default class Question extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
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
    const { question: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    }, disabled } = this.props;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div>
          <button
            type="button"
            data-testid="correct-answer"
            className="correct-answer"
            onClick={ (event) => this.handleClick(event) }
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
              onClick={ (event) => this.handleClick(event) }
              disabled={ disabled }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = ({
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
});
