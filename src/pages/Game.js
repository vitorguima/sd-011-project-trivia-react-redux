import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  renderQuestion() {
    const { triviaQuestions, idTrivia } = this.props;
    const { category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = triviaQuestions[idTrivia];

    return (
      <div>
        <h4 data-testid="question-category">{ category }</h4>
        <h3 data-testid="question-text">{ question }</h3>
        <div>
          { incorrectAnswers.map((incorrectAnswer, index) => (
            <button
              type="button"
              key={ `wrong-answer-${index}` }
              data-testid={ `wrong-answer-${index}` }
            >
              { incorrectAnswer }
            </button>
          )) }
          <button type="button" data-testid="correct-answer">{ correctAnswer }</button>
        </div>

      </div>
    );
  }

  render() {
    const { triviaQuestions } = this.props;
    return (
      <div>
        { triviaQuestions.length > 0 ? this.renderQuestion() : <p>Carregando...</p> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuestions: state.questions.questions,
  idTrivia: state.questions.idTrivia,
});

Game.propTypes = ({
  triviaQuestions: PropTypes.shape(Object),
}).isRequired;

export default connect(mapStateToProps)(Game);
