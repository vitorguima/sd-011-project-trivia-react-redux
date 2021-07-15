import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.answers = this.answers.bind(this);
    this.wasClicked = this.wasClicked.bind(this);
  }

  wasClicked() {
    this.setState({
      clicked: true,
    });
  }

  answers() {
    const { question } = this.props;
    const { clicked } = this.state;
    const buttonClass1 = (clicked ? 'correctButton' : 'button');
    const buttonClass2 = (clicked ? 'wrongButton' : 'button');
    const correct = question.correct_answer;
    const incorrects = question.incorrect_answers;
    return [
      <button
        onClick={ () => this.wasClicked() }
        className={ buttonClass1 }
        type="button"
        data-testid="correct-answer"
        key="correct-answer"
      >
        {correct}
      </button>,
      incorrects.map((element, index) => (
        <button
          onClick={ () => this.wasClicked() }
          className={ buttonClass2 }
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
