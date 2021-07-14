import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
    };
  }

  render() {
    const { questionsState } = this.props;
    const { questionNumber } = this.state;
    if (Object.keys(questionsState).length > 0) {
      const correctAnswer = questionsState.results[questionNumber].correct_answer;
      const incorrectAnswers = questionsState.results[questionNumber].incorrect_answers;
      const questionsArray = [correctAnswer, ...incorrectAnswers].sort();
      return (
        <div>
          <h1>Game Page</h1>
          <p data-testid="question-category">
            Categoria:
            {questionsState.results[questionNumber].category}
          </p>

          <p data-testid="question-text">
            {questionsState.results[questionNumber].question}
          </p>

          {questionsArray.map((item, index) => {
            if (item === correctAnswer) {
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                >
                  {item}
                </button>);
            }
            return (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {item}
              </button>);
          })}
        </div>
      );
    }
    return null;
  }
}

Game.propTypes = {
  questionsState: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questionsState: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
