import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  constructor() {
    super();
    this.answers = this.answers.bind(this);
  }

  answers() {
    const { question } = this.props;
    const correct = question.correct_answer;
    const incorrects = question.incorrect_answers;
    return [
      <button
        type="button"
        data-testid="correct-answer"
        key="correct-answer"
      >
        {correct}
      </button>,
      incorrects.map((element, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
        >
          {element}
        </button>
      )),
    ].sort(console.log(Math.floor(Math.random() * incorrects.length)));
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        Pergunta
        <h2 data-testid="question-category">{ question.category }</h2>
        <h3 data-testid="question-text">{ question.question }</h3>
        { this.answers() }
        <br />
        <button type="button" disabled>Próxima Pergunta</button>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Question;
