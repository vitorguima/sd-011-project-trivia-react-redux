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
      styleButton: false,
      // setTime: null,
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.confirmResponse = this.confirmResponse.bind(this);
    // this.funcSetTime = this.funcSetTime.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, token } = this.props;
    fetchQuestions(token);
  }

  nextQuestion() {
    this.setState((prev) => ({
      numberNext: prev.numberNext + 1,
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
    const { styleButton } = this.state;

    if (!styleButton) {
      renderButton = true;
      this.setState({
        styleButton: true,
      });
    } else {
      this.setState({
        styleButton: false,
      });
    }
  }

  // funcSetTime(setTime) {
  //   this.setState({ setTime });
  // }

  handleResponse() {
    const { questions } = this.props;
    const { numberNext, styleButton } = this.state;
    if (questions.length > 0) {
      return [
        ...questions[numberNext].incorrect_answers.map((item, index) => (
          <button
            className={ styleButton ? 'incorrect' : 'default' }
            onClick={ this.confirmResponse }
            data-testid={ `wrong-answer-${numberNext}` }
            type="button"
            // disabled={ disabled }
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
            // disabled={ disabled }
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
              {!objectsLocalStorage ? 'carregando...' : objectsLocalStorage.player.score}
            </span>
          </p>
          <div>
            <Time funcSetTime={ this.funcSetTime } />
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
};
