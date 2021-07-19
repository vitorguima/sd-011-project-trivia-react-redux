import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import '../css/game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      answered: false,
      timer: 30,
      assertions: 0,
      score: 0,
      isLoading: true,
    };
    this.answerClickHandle = this.answerClickHandle.bind(this);
    this.timerHandle = this.timerHandle.bind(this);
    this.correctButtonFunction = this.correctButtonFunction.bind(this);
    this.incorretButtonsFunction = this.incorretButtonsFunction.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.changeLoading = this.changeLoading.bind(this);
  }

  componentDidMount() {
    const ms = 1000;
    this.countdownTime = setInterval(this.timerHandle, ms);
    const { userEmail, userName } = this.props;
    const { score, assertions } = this.state;
    const player = {
      player: {
        name: userName,
        gravatarEmail: userEmail,
        score,
        assertions,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  answerClickHandle({ target }, correctAnswer, difficulty) {
    const { timer } = this.state;
    const { value } = target;
    this.setState({
      answered: true,
    });
    if (value === correctAnswer) {
      const point = 10;
      const scoreDifficulty = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      this.setState((pState) => ({
        score: pState.score + point + (timer * scoreDifficulty[difficulty]),
        assertions: pState.assertions + 1,
      }), () => {
        const { userEmail, userName } = this.props;
        const { score, assertions } = this.state;
        const player = {
          player: {
            name: userName,
            gravatarEmail: userEmail,
            score,
            assertions,
          },
        };
        localStorage.setItem('state', JSON.stringify(player));
      });
    }
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

  correctButtonFunction(index, item, correctAnswer, difficulty) {
    const { answered } = this.state;
    return (
      <button
        key={ index }
        type="button"
        data-testid="correct-answer"
        onClick={ (e) => this.answerClickHandle(e, correctAnswer, difficulty) }
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

  handleNextButton() {
    this.setState((pState) => ({
      answered: false,
      questionNumber: pState.questionNumber + 1,
      timer: 30,
    }));
    const ms = 1000;
    this.countdownTime = setInterval(this.timerHandle, ms);
  }

  changeLoading() {
    const { questionsState } = this.props;
    if (Object.keys(questionsState).length > 0) {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { questionsState } = this.props;
    const { questionNumber, timer, score, answered, isLoading } = this.state;
    if (Object.keys(questionsState).length > 0
      && questionNumber <= questionsState.results.length - 1) {
      const correctAnswer = questionsState.results[questionNumber].correct_answer;
      const incorrectAnswers = questionsState.results[questionNumber].incorrect_answers;
      const { difficulty } = questionsState.results[questionNumber];
      const questionsArray = [correctAnswer, ...incorrectAnswers].sort();
      return (
        <div>
          <h1>Game Page</h1>
          <Header score={ score } />
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
              return this.correctButtonFunction(index, item, correctAnswer, difficulty);
            }
            return this.incorretButtonsFunction(index, item);
          })}
          {answered ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextButton }
            >
              Próxima
            </button>) : null}
        </div>
      );
    }
    if (isLoading && Object.keys(questionsState).length > 0) {
      this.changeLoading();
    }
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    return <Redirect to="/feedback" />;
  }
}

Game.propTypes = {
  questionsState: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  questionsState: state.gameReducer.questions,
  userEmail: state.homeReducer.user.email,
  userName: state.homeReducer.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
