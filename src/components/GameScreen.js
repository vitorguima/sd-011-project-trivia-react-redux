import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import he from 'he';

import '../styles/GameScreen.css';
import Header from './Header';

import { playerScore } from '../actions';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.time = 0;
    this.state = {
      triviaApi: '',
      questionNumber: 0,
      disabledButton: false,
      redirect: false,
      timer: 30,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.checkTimer = this.checkTimer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount() {
    const tokenID = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${tokenID}`)
      .then((response) => response.json()
        .then((triviaApi) => this.setState({
          triviaApi,
        }))).catch((error) => this.setState({
        triviaApi: error,
      }));
  }

  componentDidUpdate() {
    const oneSecond = 1000;
    const { timer, disabledButton } = this.state;
    if (!disabledButton && timer > 0) {
      this.time = setTimeout(() => {
        this.setState((lastState) => ({
          timer: lastState.timer - 1,
        }));
      }, oneSecond);
    }
  }

  calculateScore(difficulty, timer) {
    const { updateScore } = this.props;
    const rightAnswer = 10;
    let point = 1;
    const medium = 2;
    const hard = 3;
    switch (difficulty) {
    case 'hard':
      point = hard;
      break;
    case 'medium':
      point = medium;
      break;
    default:
      break;
    }
    const score = rightAnswer + (timer * point);
    updateScore(score);
    const state = JSON.parse(localStorage.getItem('state'));
    const newState = {
      player: {
        ...state.player,
        score: state.player.score + score,
        assertions: state.player.assertions + 1,
      },
    };
    localStorage.setItem('state', JSON.stringify(newState));
  }

  handleAnswer(correct) {
    const { triviaApi: { results }, questionNumber, timer } = this.state;
    this.setState({
      disabledButton: true,
    });
    clearTimeout(this.time);
    if (correct) {
      this.calculateScore(results[questionNumber].difficulty, timer);
    }
  }

  checkTimer() {
    const { timer, disabledButton } = this.state;
    if (timer === 0 && !disabledButton) {
      this.handleAnswer(false);
    }
  }

  handleNextButton() {
    const { questionNumber } = this.state;
    const lastQuestion = 4;

    if (questionNumber === lastQuestion) {
      this.setState({ redirect: true });
    } else {
      this.setState((prevState) => ({
        questionNumber: prevState.questionNumber + 1,
        disabledButton: false,
        timer: 30,
      }));
    }
  }

  renderQuestions() {
    const { triviaApi: { results },
      questionNumber,
      redirect,
      disabledButton } = this.state;
    return (
      <>
        {redirect ? <Redirect to="/feedback" /> : null}
        <h4
          className="category"
          data-testid="question-category"
        >
          {he.decode(results[questionNumber].category)}
        </h4>
        <p
          className="question"
          data-testid="question-text"
        >
          {he.decode(results[questionNumber].question)}
        </p>
        <div className="answers-container">
          { results[questionNumber].incorrect_answers.map((answer, index) => (
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              className="wrong alternative"
              onClick={ () => this.handleAnswer(false) }
              disabled={ disabledButton }
            >
              {he.decode(answer)}
            </button>
          ))}
          <button
            type="button"
            data-testid="correct-answer"
            className="correct alternative"
            onClick={ () => this.handleAnswer(true) }
            disabled={ disabledButton }
          >
            {he.decode(results[questionNumber].correct_answer)}
          </button>
        </div>
      </>
    );
  }

  render() {
    const { triviaApi: { results }, timer, disabledButton } = this.state;
    this.checkTimer();
    return (
      <div className="gamescreen">
        <Header />
        {results ? (
          <div>
            <span className="timer">{`Tempo: ${timer}`}</span>
            {this.renderQuestions()}
            {disabledButton ? (
              <div>
                <button
                  data-testid="btn-next"
                  className="next-btn"
                  type="button"
                  onClick={ this.handleNextButton }
                >
                  Próxima
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h4 className="loading" data-testid="question-category">Carregando...</h4>
            <p className="loading" data-testid="question-text">...</p>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(playerScore(score)),
});

GameScreen.propTypes = {
  updateScore: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(GameScreen);
