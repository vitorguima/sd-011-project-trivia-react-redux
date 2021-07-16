import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Gaming.css';
import md5 from 'crypto-js/md5';
import { fetchQuestion } from '../redux/actions';
import Time from './components/Time';

let renderButton = false;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      numberNext: 0,
      score: 0,
      assertions: 0,
      styleButton: false,
      setTime: null,
      disabled: false,
      renderTime: true,
      numberTime: 30,
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.confirmResponse = this.confirmResponse.bind(this);
    this.funcSetTime = this.funcSetTime.bind(this);
    this.timeQuestion = this.timeQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, token } = this.props;
    fetchQuestions(token);
  }

  setLocalStorage() {
    const { score, assertions } = this.state;
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { name } = getLocalStorage.player;
    const { gravatarEmail } = getLocalStorage.player;
    localStorage.setItem('state', JSON.stringify({ player: {
      name,
      score,
      assertions,
      gravatarEmail,
    } }));
  }

  verifyResponse() {
    const { questions } = this.props;
    const { numberNext, numberTime } = this.state;
    const { difficulty } = questions[numberNext];
    const magicMike = 10;
    const difficultyLevel = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    this.setState((prev) => ({
      score: prev.score + magicMike + (numberTime * difficultyLevel[difficulty]),
      assertions: prev.assertions + 1,
    }), this.setLocalStorage);
  }

  nextQuestion() {
    this.setState((prev) => ({
      numberNext: prev.numberNext + 1,
      disabled: prev.disabled - 0,
    }));
  }

  handleQuestion() {
    const { questions } = this.props;
    const { numberNext } = this.state;
    if (questions.length > 0) {
      return (
        <div>
          <h2
            data-testid="question-category"
          >
            {' '}
            { questions[numberNext].question }
            {' '}

          </h2>
          <p
            data-testid="question-text"
          >
            {' '}
            { questions[numberNext].category }
            {' '}

          </p>
        </div>
      );
    }
  }

  timeQuestion(sec) {
    const { numberTime } = this.state;
    if (sec < numberTime) {
      if (sec <= 0) {
        this.confirmResponse();
      }
      this.setState({
        numberTime: sec,
      });
    }
  }

  confirmResponse() {
    const { styleButton, setTime } = this.state;
    clearInterval(setTime);
    if (!styleButton) {
      renderButton = true;
      this.setState({
        disabled: true,
        styleButton: true,
        renderTime: false,
      });
    } else if (styleButton) {
      this.setState({
        disabled: false,
        styleButton: false,
        renderTime: true,
      });
    }
  }

  funcSetTime(setTime) {
    const { disable } = this.state;
    if (setTime <= 0 && !disable) {
      this.confirmResponse();
    }
  }

  handleResponse() {
    const { questions } = this.props;
    const { numberNext, styleButton, disabled } = this.state;
    if (questions.length > 0) {
      return [
        ...questions[numberNext].incorrect_answers.map((item, index) => (
          <button
            className={ styleButton ? 'incorrect' : 'default' }
            data-testid={ `wrong-answer-${numberNext}` }
            type="button"
            value={ item }
            disabled={ disabled }
            key={ index }
            onClick={ this.confirmResponse }
          >
            <div>{item}</div>
          </button>)),
        (
          <button
            className={ styleButton ? 'correct' : 'default' }
            value={ questions[numberNext].correct_answer }
            data-testid="correct-answer"
            key={ numberNext }
            disabled={ disabled }
            onClick={ () => {
              this.confirmResponse();
              this.verifyResponse();
            } }
            type="button"
          >
            {questions[numberNext].correct_answer}
          </button>),
      ];
    }
  }

  render() {
    const { players, email } = this.props;
    const { renderTime, numberTime, score } = this.state;
    // const objectsLocalStorage = JSON.parse(localStorage.getItem('state'));
    const hashGenerator = md5(email).toString();
    return (
      <div>
        <header>
          <h3 data-testid="header-player-name">{players}</h3>
          <img
            src={ `https://www.gravatar.com/avatar/${hashGenerator}` }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
          <p>
            <span data-testid="header-score">
              { score }
            </span>
          </p>
          <div>
            {renderTime ? <Time
              funcSetTime={ this.funcSetTime }
              timeQuestion={ this.timeQuestion }
            /> : <div>{ numberTime }</div> }
          </div>
          <div>
            {this.handleQuestion()}
            {this.handleResponse()}
          </div>
          { renderButton
            ? (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => {
                  this.nextQuestion();
                  this.confirmResponse();
                } }
              >
                Próxima
              </button>
            ) : (
              <div />
            )}
          <div />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.homeReducer.email,
  players: state.homeReducer.name,
  token: state.homeReducer.token,
  questions: state.gameReduce.Questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestion(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  players: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf.isRequired,
  correct_answer: PropTypes.string.isRequired,
};
