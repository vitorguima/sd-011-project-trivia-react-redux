import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import '../style/GamePage.style.css';
import Timer from '../components/Timer';
import { enablebtns, subTimer, dispatchScore, resetTimer } from '../actions';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = { questionIndex: 0, click: false, nextBtnDisable: true };
    this.btnHandle = this.btnHandle.bind(this);
    this.clickAnswer = this.clickAnswer.bind(this);
  }

  componentDidMount() {
    this.timerFunc();
    this.enableBtnsTimer();
  }

  componentDidUpdate() {
    this.saveLocalStorage();
    const { timer } = this.props;
    if (timer <= 0) {
      clearInterval(this.setTimer);
    }
  }

  btnHandle(indexLimit, questionIndex) {
    if (indexLimit === questionIndex) {
      const { history } = this.props;
      history.push('/feedback');
    }

    const { enableBtns, resetDispatch } = this.props;
    enableBtns();
    this.setState((previewState) => ({
      questionIndex: previewState.questionIndex + 1,
      click: false,
      nextBtnDisable: true,
    }));
    resetDispatch();
    this.timerFunc();
  }

  clickAnswer() {
    clearInterval(this.setTimer);
    this.setState({
      click: true,
      nextBtnDisable: false,
    });
  }

  saveLocalStorage() {
    const { nome, score, email, assertionsGame } = this.props;
    const state = {
      player: {
        nome,
        assertions: assertionsGame,
        score,
        gravatarEmail: email,
      },
    };
    const infosGamePlayer = [{ name: nome, score, picture: this.URL }];
    localStorage.setItem('ranking', JSON.stringify(infosGamePlayer));
    localStorage.setItem('state', JSON.stringify(state));
  }

  questionSection(results, questionIndex) {
    return (
      <section>
        <p data-testid="question-category">{results[questionIndex].category}</p>
        Question:
        <p data-testid="question-text">{results[questionIndex].question}</p>
      </section>
    );
  }

  scoreUpdate(difficulty) {
    const { timer } = this.props;
    let result = 0;
    const points = 10;
    const levelHard = 3;
    const levelMedium = 2;
    const levelEasy = 1;
    switch (difficulty) {
    case 'hard':
      result = points + (timer * levelHard);
      return result;
    case 'medium':
      result = points + (timer * levelMedium);
      return result;
    case 'easy':
      result = points + (timer * levelEasy);
      return result;
    default:
      return result;
    }
  }

  nextBtn(nextBtnDisable, indexLimit, questionIndex) {
    return (
      <button
        type="button"
        onClick={ () => this.btnHandle(indexLimit, questionIndex) }
        data-testid="btn-next"
        disabled={ nextBtnDisable || indexLimit < questionIndex }
      >
        Próximo
      </button>
    );
  }

  answBtnCreator(results, questionIndex, click, disableBtnByTime) {
    const result = results[questionIndex];
    const { difficulty } = result;
    const { upDateScore } = this.props;
    const btnCorrectAnsw = (
      <button
        key="correct-answer"
        className={ click ? 'rightAnswer' : null }
        onClick={ () => {
          this.clickAnswer();
          upDateScore(this.scoreUpdate(difficulty));
        } }
        type="button"
        data-testid="correct-answer"
        disabled={ disableBtnByTime || click }
      >
        {result.correct_answer}
      </button>);

    const btnWrngAnsw = [...result.incorrect_answers.map((wrngAnsw, index) => (
      <button
        key={ index }
        onClick={ this.clickAnswer }
        className={ click ? 'wrongAnswer' : null }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        disabled={ disableBtnByTime || click }
      >
        {wrngAnsw}
      </button>))];
    // const randomNb = 0.5;
    const allBtns = [...btnWrngAnsw, btnCorrectAnsw];
    // .sort(() => Math.random() - randomNb);
    return allBtns;
  }

  timerFunc() {
    const { timerDispatch } = this.props;
    const limit = 1000;
    this.setTimer = setInterval(() => timerDispatch(), limit);
  }

  enableBtnsTimer() {
    const limit = 30000;
    this.enableBtn = setTimeout(() => this.setState({ nextBtnDisable: false }), limit);
  }

  urlCreator() {
    const { email } = this.props;
    const hash = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return hash;
  }

  renderHeader(urlSrc) {
    const { nome, score } = this.props;
    return (
      <header>
        <img
          src={ urlSrc }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{nome}</h2>
        <h2
          data-testid="header-score"
        >
          Placar:
          { score }
        </h2>
      </header>
    );
  }

  render() {
    const { results, disableBtnByTime } = this.props;
    const { questionIndex, click, nextBtnDisable } = this.state;
    const indexLimit = 4;
    this.URL = this.urlCreator();

    return (
      <div>
        {this.renderHeader(this.URL)}
        <Timer />
        {results && this.questionSection(results, questionIndex)}
        {results && this.answBtnCreator(results, questionIndex, click, disableBtnByTime)}
        <br />
        {
          (!nextBtnDisable || indexLimit < questionIndex)
            ? this.nextBtn(nextBtnDisable, indexLimit, questionIndex)
            : null
        }
      </div>
    );
  }
}

GamePage.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  timer: PropTypes.number.isRequired,
  disableBtnByTime: PropTypes.bool.isRequired,
  enableBtns: PropTypes.func.isRequired,
  timerDispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  upDateScore: PropTypes.func.isRequired,
  resetDispatch: PropTypes.func.isRequired,
  assertionsGame: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  enableBtns: () => dispatch(enablebtns()),
  timerDispatch: () => dispatch(subTimer()),
  upDateScore: (result) => dispatch(dispatchScore(result)),
  resetDispatch: () => dispatch(resetTimer()),
});

const mapStateToProps = (state) => ({
  nome: state.loginReducer.login.nome,
  email: state.loginReducer.login.email,
  results: state.triviaReducer.questions.results,
  timer: state.triviaReducer.timer,
  disableBtnByTime: state.triviaReducer.isDisable,
  score: state.triviaReducer.score,
  assertionsGame: state.triviaReducer.assertions,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GamePage));
