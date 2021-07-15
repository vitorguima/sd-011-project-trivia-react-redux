import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../css/game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      answered: false,
    };
    this.answerClickHandle = this.answerClickHandle.bind(this);
  }

  answerClickHandle({ target }) {
    console.log(target.value);
    this.setState({
      answered: true,
    });
  }

  render() {
    const { questionsState } = this.props;
    const { questionNumber, answered } = this.state;
    if (Object.keys(questionsState).length > 0) {
      const correctAnswer = questionsState.results[questionNumber].correct_answer;
      const incorrectAnswers = questionsState.results[questionNumber].incorrect_answers;
      const questionsArray = [correctAnswer, ...incorrectAnswers].sort();
      return (
        <div>
          <h1>Game Page</h1>
          <Header />
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
                  onClick={ this.answerClickHandle }
                  value={ item }
                  className={ answered ? 'correctAnswer' : null }
                >
                  {item}
                </button>);
            }
            return (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.answerClickHandle }
                value={ item }
                className={ answered ? 'incorrectAnswer' : null }
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
