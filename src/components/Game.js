import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchQuestions } from '../actions';
import '../App.css';
import Timer from './Timer';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      num: 0,
      styleButton: false,
      timer: null,
      seconds: 30,
      disabled: false,
      resetTimer: true,
      // score: 0,
      // assertions: 0,
      // answer: false,
    };

    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleClickState = this.handleClickState.bind(this);
    this.funcTimer = this.funcTimer.bind(this);
    this.funcSeconds = this.funcSeconds.bind(this);
    // this.renderNextButton = this.renderNextButton.bind(this);
  }

  componentDidMount() {
    const { getToken, fetchApiQuestions } = this.props;
    fetchApiQuestions(getToken);
  }

  funcTimer(timer) {
    this.setState({
      timer,
    });
  }

  funcSeconds(sec) {
    const { seconds } = this.state;
    if (sec < seconds) {
      this.setState({ seconds: sec });
      if (sec <= 0) {
        this.handleClickState();
      }
    }
  }

  handleClickState() {
    const { styleButton, timer } = this.state;
    clearInterval(timer);
    if (!styleButton) {
      this.setState({
        styleButton: true,
        disabled: true,
        resetTimer: false,
        // answer: true,
      });
    }
  }

  handleState() {
    this.setState((prev) => ({
      num: prev.num + 1,
      seconds: 30,
      styleButton: false,
      disabled: false,
      resetTimer: true,
      // answer: false,
    }));
  }

  // receivedSecondsTimer(seconds) {
  //   const { disabled } = this.state;
  //   if (seconds <= 0 && !disabled) {
  //     this.handleClickState();
  //   }
  // }

  // handleScorteAssetions({ target }) {
  //   const { getQuestions } = this.props;
  //   const { num, seconds } = this.state;
  //   const { value } = target;
  //   const { correct_answer: correctAnswer, difficulty } = getQuestions[num];
  //   const modo = {
  //     easy: 1,
  //     medium: 2,
  //     hard: 3,
  //   };
  //   const magicNum = 10;
  //   if (value === correctAnswer) {
  //     this.setState((previousState) => ({
  //       score: previousState.score + magicNum + (seconds * modo[difficulty]),
  //       assertions: previousState.assertions + 1,
  //     }), () => {
  //       const getLocalStorage = JSON.parse(localStorage.getItem('state'));
  //       const { score, assertions } = this.state;
  //       getLocalStorage.player.score = score;
  //       getLocalStorage.player.assertions = assertions;
  //       localStorage.setItem('state', JSON.stringify(getLocalStorage));
  //     });
  //   }
  // }

  renderAnswers() {
    const { getQuestions } = this.props;
    const { num, styleButton, disabled } = this.state;
    if (getQuestions.length > 0) {
      return [
        ...getQuestions[num].incorrect_answers.map((value, index) => (
          <button
            className={ styleButton ? 'wrong' : 'default' }
            type="button"
            data-testid={ `wrong-answer-${num}` }
            key={ index }
            disabled={ disabled }
            onClick={ this.handleClickState }
          >
            { value }
          </button>
        )),
        (
          <button
            className={ styleButton ? 'success' : 'default' }
            type="button"
            data-testid="correct-answer"
            value={ getQuestions[num].correct_answer }
            key={ num }
            disabled={ disabled }
            onClick={ () => {
              this.handleClickState();
              // this.handleScorteAssetions(event);
            } }
          >
            {getQuestions[num].correct_answer}
          </button>
        ),
      ];
    }
  }

  // renderNextButton() {
  //   const { num } = this.state;
  //   const magicNum = 4;
  //   return (num < magicNum ? (
  //     <button
  //       data-testid="btn-next"
  //       type="button"
  //       onClick={ () => {
  //         this.handleState();
  //       } }
  //     >
  //       Próxima
  //     </button>)
  //     : (
  //       <Link to="/feedback">
  //         <button
  //           data-testid="btn-next"
  //           type="button"
  //           onClick={ () => {
  //             this.handleState();
  //           } }
  //         >
  //           Próxima
  //         </button>
  //       </Link>)
  //   );
  // }

  renderQuestion() {
    const { getQuestions } = this.props;
    const { num } = this.state;
    if (getQuestions.length > 0) {
      return (
        <>
          <div data-testid="question-text">{getQuestions[num].question}</div>
          <p data-testid="question-category">{getQuestions[num].category}</p>
        </>
      );
    }
  }

  render() {
    const { resetTimer, seconds } = this.state;
    const { getState } = this.props;
    const hashEmail = md5(getState.email).toString();
    const getLocalStorage = JSON.parse(localStorage.getItem('player'));
    return (
      <div>
        <header>
          <div>
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="profile" />
            <h3
              data-testid="header-player-name"
            >
              { getState.name || getLocalStorage.name}
            </h3>
            <span
              data-testid="header-score"
            >
              { 0 }
            </span>
          </div>
        </header>
        { (resetTimer)
          ? (<Timer timerFunc={ this.funcTimer } secondsFunc={ this.funcSeconds } />)
          : (seconds) }
        <div>
          { this.renderQuestion() }
          { this.renderAnswers() }
          {/* { answer && this.renderNextButton() } */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getState: state.login,
  getToken: state.login.token,
  getQuestions: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  getState: PropTypes.obj,
  getToken: PropTypes.string,
}.isRequired;
