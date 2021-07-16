import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
    this.gameQuestions = this.gameQuestions.bind(this);
  }

  gameQuestions() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    const question = questions[questionIndex];
    const alternatives = [...question.incorrect_answers, question.correct_answer];
    const correctAnswer = question.correct_answer;

    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <label htmlFor="alternative">
          { alternatives.map((alternative, index) => (
            <div key={ index }>
              { alternative }
              <input
                type="radio"
                id="alternative"
                name="alternative-question"
                data-testid={ alternative === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
                value={ alternative }
              />
            </div>
          )).sort()}
        </label>
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
