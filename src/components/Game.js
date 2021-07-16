import React, { Component } from 'react';
import './Game.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      assertions: 0,
    };
    this.gameQuestions = this.gameQuestions.bind(this);
    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
  }

  checkCorrectAnswer({ target }) {
    const { dataset: { testid: answer } } = target;
    if (answer.includes('correct')) {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }));
    }
    target.classList.add('clicked');

    const father = target.parentElement;
    const childs = [...father.children];
    console.log(childs);
    childs.forEach((child) => {
      const { testid } = child.dataset;
      child.classList.add(testid);
      child.disabled = true;
    });
  }

  gameQuestions() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    const question = questions[questionIndex];
    const alternatives = [...question.incorrect_answers, question.correct_answer];
    // http://www.buginit.com/javascript/javascript-sort-without-mutating-array/
    const alternativesToSort = alternatives.concat().sort();
    const correctAnswer = question.correct_answer;

    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <div className="alternativesContainer">
          { alternativesToSort.map((alternative) => {
            const index = alternatives.indexOf(alternative);
            return (
              <button
                key={ index }
                type="button"
                onClick={ this.checkCorrectAnswer }
                data-testid={ alternative === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
              >
                { alternative }
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { questions, error } = this.props;
    const question = questions;
    const errorTrue = 'Token expirado, por favor faça o login novamente';
    console.log(question);
    return (
      <div>
        <h1>Pergunta:</h1>
        { error ? errorTrue : this.gameQuestions() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions,
  error: state.playerReducer.error,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  error: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
