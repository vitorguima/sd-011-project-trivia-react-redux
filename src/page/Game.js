import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Gaming.css';
import md5 from 'crypto-js/md5';
import { fetchQuestion } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      numberNext: 0,
      styleButton: false,
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.confirmResponse = this.confirmResponse.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, token } = this.props;
    fetchQuestions(token);
  }

  nextQuestion() {
    this.setState((prev) => ({
      numberNext: prev.numberNext + 1,
      styleButton: false,
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

  confirmResponse() {
    this.setState({
      styleButton: true,
    });
  }

  handleResponse() {
    const { questions } = this.props;
    const { numberNext, styleButton } = this.state;
    console.log(questions);
    if (questions.length > 0) {
      return [
        ...questions[numberNext].incorrect_answers.map((item, index) => (
          <button
            className={ styleButton ? 'incorrect' : 'default' }
            onClick={ this.confirmResponse }
            data-testid={ `wrong-answer-${numberNext}` }
            type="button"
            key={ index }
          >
            <div>{item}</div>
          </button>)),
        (
          <button
            className={ styleButton ? 'correct' : 'default' }
            onClick={ this.confirmResponse }
            data-testid="correct-answer"
            key={ numberNext }
            type="button"
          >
            {questions[numberNext].correct_answer}
          </button>),
      ];
    }
  }

  render() {
    const { players, email } = this.props;
    const objectsLocalStorage = JSON.parse(localStorage.getItem('state'));
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
              {!objectsLocalStorage ? 0 : objectsLocalStorage.score}
            </span>
          </p>
          <div>
            {this.handleQuestion()}
            {this.handleResponse()}
          </div>
          <button type="button" onClick={ this.nextQuestion }>Proxima</button>
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
};
