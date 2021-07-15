import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      styles: ['', ''],
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
    let data = localStorage.getItem('state');
    console.log(data);
    const state = JSON.parse(data);
    const newState = {
      player: {
        ...state.player,
        score,
        assertions: state.player.assertions + 1,
      },
    };
    data = JSON.stringify(newState);
    localStorage.setItem('state', data);
  }

  handleAnswer(correct) {
    const { triviaApi: { results }, questionNumber, timer } = this.state;
    const styles = ['wrong-answer', 'correct-answer'];
    this.setState({
      styles,
      disabledButton: true,
    });
    clearTimeout(this.time);
    if (correct) {
      console.log('Click antes de calcular');
      this.calculateScore(results[questionNumber].difficulty, timer);
    }
  }

  checkTimer() {
    const { timer, disabledButton } = this.state;
    if (timer === 0 && !disabledButton) {
      this.handleAnswer();
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
        styles: ['', ''],
        disabledButton: false,
      }));
    }
  }

  renderQuestions() {
    const { triviaApi: { results },
      questionNumber,
      styles,
      redirect,
      disabledButton } = this.state;
    return (
      <>
        {redirect ? <Redirect to="/feedback" /> : null}
        <h4 data-testid="question-category">{results[questionNumber].category}</h4>
        <p data-testid="question-text">{results[questionNumber].question}</p>
        { results[questionNumber].incorrect_answers.map((answer, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ styles[0] }
            onClick={ () => this.handleAnswer(false) }
            disabled={ disabledButton }
          >
            {answer}
          </button>
        ))}
        <button
          type="button"
          data-testid="correct-answer"
          className={ styles[1] }
          onClick={ () => this.handleAnswer(true) }
          disabled={ disabledButton }
        >
          {results[questionNumber].correct_answer}
        </button>
      </>
    );
  }

  render() {
    const { triviaApi: { results }, timer, disabledButton } = this.state;
    this.checkTimer();
    return (
      <>
        <Header />
        <span>{`Timer: ${timer}`}</span>
        {results ? (
          <div>
            {this.renderQuestions()}
            {disabledButton ? (
              <div>
                <button
                  data-testid="btn-next"
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
            <h4 data-testid="question-category">carregando..</h4>
            <p data-testid="question-text">...</p>
          </div>
        )}
      </>
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
