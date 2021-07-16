import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getQuestionsThunk } from '../actions';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      number: 0,
      disabled: false,
      seconds: 30,
      score: 0,
    };

    this.colorOptions = this.colorOptions.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.timer = this.timer.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    const miliSeconds = 1000;
    if (localStorage.token) {
      getQuestions(localStorage.getItem('token'));
    }
    this.startTimer();
    this.interval = setInterval(this.timer, miliSeconds);
  }

  colorOptions({ target }) {
    const { questions, name } = this.props;
    const { number, seconds } = this.state;
    const rightAnswer = document.querySelector('#correct-answer');
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    rightAnswer.classList.add('correct-color');
    wrongAnswers.forEach((answer) => {
      answer.classList.add('wrong-color');
    });
    if (target === rightAnswer) {
      let sum = 0;
      const difficulty = questions.results[number].difficulty;
      switch (difficulty) {
      case 'easy':
        sum = seconds * 1;
        break;
      case 'medium':
        sum = seconds * 2;
        break;
      case 'hard':
        sum = seconds * 3;
        break;
      default:
        break;
      }
      this.setState((state) => ({
        score: state.score + 10 + sum,
      }));
      localStorage.setItem(name, this.state.score);
    }
    clearInterval(this.interval);
    this.setState({
      disabled: true,
      seconds: 0,
    });
  }

  startTimer() {
    const seconds = 30000;
    setTimeout(() => {
      this.colorOptions();
    }, seconds);
  }

  timer() {
    const { seconds } = this.state;
    this.setState((state) => ({
      seconds: state.seconds - 1,
    }));
    if (seconds === 0) {
      clearInterval(this.interval);
      this.setState({
        seconds: 0,
      });
    }
  }

  handleQuestion() {
    const miliSeconds = 1000;
    const rightAnswer = document.querySelector('#correct-answer');
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    rightAnswer.classList = '';
    wrongAnswers.forEach((answer) => {
      answer.classList = '';
    });
    this.setState((state) => ({
      number: state.number + 1,
      disabled: false,
      seconds: 30,
    }));
    this.startTimer();
    this.interval = setInterval(this.timer, miliSeconds);
  }

  renderQuestions() {
    const { questions } = this.props;
    const { disabled, number } = this.state;
    return (
      <div>
        <h5
          data-testid="question-category"
        >
          {questions.results[number].category}
        </h5>
        <h2 data-testid="question-text">{questions.results[number].question}</h2>
        <button
          type="button"
          data-testid="correct-answer"
          id="correct-answer"
          onClick={ (event) => this.colorOptions(event) }
          disabled={ disabled }
        >
          {questions.results[number].correct_answer}
        </button>
        {questions.results[number].incorrect_answers.map((incorrect, key) => (
          <button
            key={ key }
            type="button"
            data-testid={ `wrong-answer ${key}` }
            id="wrong-answer"
            onClick={ (event) => this.colorOptions(event) }
            disabled={ disabled }
          >
            { incorrect }
          </button>
        ))}
      </div>
    );
  }

  render() {
    const { loading, hash, name } = this.props;
    const { disabled, seconds, number, score } = this.state;
    const maxQuestions = 5;
    if (number === maxQuestions) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Gravatar" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <div>
          <p id="timer">{ seconds }</p>
          {!loading
            ? (this.renderQuestions()) : <p>loading...</p>}
          {disabled
            ? (
              <button
                onClick={ this.handleQuestion }
                data-testid="btn-next"
                type="button"
                id="btnNext"
              >
                Próxima
              </button>
            )
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token,
  loading: state.game.loading,
  score: state.game.score,
  hash: state.login.hash,
  name: state.login.name,
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionsThunk(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  token: PropTypes.string,
  loading: PropTypes.bool,
}.isRequired;
