import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      questionNumber: 0,
      showClass: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.answers = this.answers.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.hideAnswer = this.hideAnswer.bind(this);
    this.buttons = this.buttons.bind(this);
  }

  handleClick() {
    this.setState((prev) => ({ questionNumber: prev.questionNumber + 1 }));
  }

  showAnswer() {
    this.setState({ showClass: true });
  }

  hideAnswer() {
    this.setState({ showClass: false });
  }

  answers() {
    const { questions } = this.props;
    const { questionNumber, showClass } = this.state;
    return [
      ...questions[questionNumber].incorrect_answers.map((value, index) => (
        <button
          style={ showClass ? { backgroundColor: 'red' } : { backgroundColor: 'grey' } }
          key={ index }
          type="button"
          onClick={ this.showAnswer }
          disabled={ showClass }
          data-testid={ `wrong-answer-${index}` }
        >
          {value}
        </button>
      )),
      <button
        style={ showClass ? { backgroundColor: 'green' } : { backgroundColor: 'grey' } }
        key="correct"
        type="button"
        onClick={ this.showAnswer }
        disabled={ showClass }
        data-testid="correct-answer"
      >
        {questions[questionNumber].correct_answer}
      </button>,
    ];
  }

  buttons() {
    const { questions } = this.props;
    const { questionNumber, showClass } = this.state;
    if (questionNumber < questions.length - 1) {
      return (
        <button
          type="button"
          onClick={ () => { this.handleClick(); this.hideAnswer(); } }
          disabled={ !showClass }
        >
          Próxima Questão
        </button>);
    }
    return (
      <button
        type="button"
        disabled={ !showClass }
      >
        Verificar Pontuação
      </button>);
  }

  render() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const number = 0.5;
    console.log(questions);
    return (
      <div>
        <p>
          {questions[questionNumber].question}
        </p>
        {this.answers().sort(() => Math.random() - number)}
        <p>
          { this.buttons() }
        </p>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(object),
}.isRequired;
