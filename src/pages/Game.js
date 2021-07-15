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
      timer: 30,
    };
    this.answerClickHandle = this.answerClickHandle.bind(this);
    this.timerHandle = this.timerHandle.bind(this);
    this.correctButtonFunction = this.correctButtonFunction.bind(this);
    this.incorretButtonsFunction = this.incorretButtonsFunction.bind(this);
  }

  componentDidMount() {
    const ms = 1000;
    this.countdownTime = setInterval(this.timerHandle, ms);
  }

  answerClickHandle({ target }) {
    console.log(target.value);
    this.setState({
      answered: true,
    });
  }

  timerHandle() {
    const { timer, answered } = this.state;
    this.setState((pState) => ({
      timer: pState.timer - 1,
    }));
    if (timer < 2) {
      this.setState({
        answered: true,
      });
      clearInterval(this.countdownTime);
    }
    if (answered) {
      clearInterval(this.countdownTime);
    }
  }

  correctButtonFunction(index, item) {
    const { answered } = this.state;
    return (
      <button
        key={ index }
        type="button"
        data-testid="correct-answer"
        onClick={ this.answerClickHandle }
        value={ item }
        disabled={ answered }
        className={ answered ? 'correctAnswer' : null }
      >
        {item}
      </button>);
  }

  incorretButtonsFunction(index, item) {
    const { answered } = this.state;
    return (
      <button
        key={ index }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.answerClickHandle }
        value={ item }
        disabled={ answered }
        className={ answered ? 'incorrectAnswer' : null }
      >
        {item}
      </button>);
  }

  render() {
    const { questionsState } = this.props;
    const { questionNumber, timer } = this.state;
    if (Object.keys(questionsState).length > 0) {
      const correctAnswer = questionsState.results[questionNumber].correct_answer;
      const incorrectAnswers = questionsState.results[questionNumber].incorrect_answers;
      const questionsArray = [correctAnswer, ...incorrectAnswers].sort();
      return (
        <div>
          <h1>Game Page</h1>
          <Header />
          <h2>{timer}</h2>
          <p data-testid="question-category">
            Categoria:
            {questionsState.results[questionNumber].category}
          </p>
          <p data-testid="question-text">
            {questionsState.results[questionNumber].question}
          </p>
          {questionsArray.map((item, index) => {
            if (item === correctAnswer) {
              return this.correctButtonFunction(index, item);
            }
            return this.incorretButtonsFunction(index, item);
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
