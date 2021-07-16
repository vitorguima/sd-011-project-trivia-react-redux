import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class gameScreen extends Component {
  constructor() {
    super();
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.state = {
      question: 0,
      player,
    };

    this.colorSelectCorrect = this.colorSelectCorrect.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.colorSelectCorrect();
    this.correctAnswer();
  }

  correctAnswer() {
    const fixedPoints = 10;
    const { question, player } = this.state;
    const { results } = this.props;
    let difValue = 0;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const cronoValue = document.querySelector('.cronometer').innerHTML.split(':')[1];
    if ((results[question].difficulty) === 'hard') {
      difValue = hard;
    } if ((results[question].difficulty) === 'medium') {
      difValue = medium;
    } if ((results[question].difficulty) === 'easy') {
      difValue = easy;
    }
    localStorage.setItem('state', JSON.stringify({ player:
      { name: player.name,
        assertions: player.assertions + 1,
        score: player.score + (fixedPoints + (cronoValue * difValue)),
        gravatarEmail: player.email } }));
  }

  colorSelectCorrect() {
    const btns = document.querySelectorAll('button');
    btns.forEach((element) => { element.classList.add('revel-color'); });
  }

  nextQuestion() {
    const { results } = this.props;
    const { question } = this.state;
    if (question < results.length - 1) {
      this.setState({
        question: question + 1,
      });
    }
  }

  render() {
    const { results } = this.props;
    const { question } = this.state;
    return (
      <div>
        {results.length > 0 ? (
          <div>
            <p data-testid="question-category">{results[question].category}</p>
            <p data-testid="question-text">{results[question].question}</p>
            <button
              type="button"
              data-testid="correct-answer"
              className="green-border"
              onClick={ () => this.onClickHandler() }
            >
              {results[question].correct_answer}
            </button>
            {results[0].incorrect_answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                className="red-border"
                onClick={ () => this.colorSelectCorrect() }
              >
                {answer}
              </button>
            ))}
          </div>
        ) : (
          <p>Baixando Questões</p>
        )}
      </div>
    );
  }
}

gameScreen.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
};
