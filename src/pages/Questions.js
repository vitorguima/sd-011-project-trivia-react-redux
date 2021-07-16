import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Questions.css';
import Timer from '../components/Timer';
import { userScore } from '../actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      enableButtons: false,
      selectAnswer: false,
      sec: 30,
      renderTimer: true,
      goToFeedback: false,
    };
    this.getQuestions = this.getUnities.bind(this);
    this.handleEnableButton = this.handleEnableButton.bind(this);
    this.addWrongBorder = this.addWrongBorder.bind(this);
    this.funcSetTime = this.funcSetTime.bind(this);
    this.setRanking = this.setRanking.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.buttons = this.buttons.bind(this);
  }

  async componentDidMount() {
    this.getUnities();
  }

  componentDidUpdate() {
    this.handleEnableButton();
  }

  async getUnities() {
    const token = localStorage.getItem('token');
    const api = `https://opentdb.com/api.php?amount=5&token${token}`;
    const questions = await fetch(api)
      .then((result) => result.json());
    this.setState(() => ({
      questions: questions.results,
      setTime: null,
    }));
  }

  setRanking(difficulty) {
    const { dispatchUserScore, score } = this.props;
    const { sec } = this.state;
    const initialScore = 10;
    const dificultNum = { hard: 3, medium: 2, easy: 1, wrong: 0 };
    const state = JSON.parse(localStorage.getItem('state'));
    if (difficulty === 'wrong') {
      dispatchUserScore(score + 0);
    } else {
      state.player.assertions += 1;
      state.player.score = state.player.score + initialScore
        + (sec * dificultNum[difficulty]);
      dispatchUserScore(score + state.player.score);
    }
    localStorage.setItem('state', JSON.stringify(state));
  }

  addWrongBorder(difficulty) {
    const { setTime } = this.state;
    const wrong = [...document.getElementsByClassName('wrong')];
    const tru = [...document.getElementsByClassName('true')];
    tru.forEach((node) => { node.className = 'true-answer'; });
    wrong.forEach((node) => { node.className = 'wrong-answer'; });
    this.setState({ selectAnswer: true, renderTimer: false });
    clearInterval(setTime);
    this.setRanking(difficulty);
  }

  incorrectAnswers() {
    const { questions, selectAnswer, questionNumber } = this.state;
    const getQuestion = questions[questionNumber];
    const selectedQuestion = getQuestion && getQuestion.incorrect_answers;
    return selectedQuestion && selectedQuestion.map((question, index) => (
      <button
        className="wrong"
        type="button"
        key={ question }
        data-testid={ `wrong-answer-${index}` }
        onClick={ () => this.addWrongBorder('wrong') }
        disabled={ selectAnswer }
      >
        {question}
      </button>));
  }

  handleEnableButton(seconds) {
    const { enableButtons, sec } = this.state;
    if (seconds < sec) {
      this.setState({ sec: seconds });
    }
    if (seconds <= 0 && !enableButtons) {
      this.addWrongBorder('wrong');
    }
  }

  funcSetTime(setTime) {
    this.setState({ setTime });
  }

  changeQuestion() {
    const tru = [...document.getElementsByClassName('true-answer')];
    tru.forEach((node) => { node.className = 'true'; });
    this.setState((prev) => ({ questionNumber: prev.questionNumber + 1,
      selectAnswer: false,
      enableButtons: false,
      renderTimer: true,
      sec: 30 }), () => {
      this.timerQuestion();
    });
  }

  timerQuestion() {
    return (<Timer
      handleEnableButton={ this.handleEnableButton }
      funcSetTime={ this.funcSetTime }
    />);
  }

  buttons() {
    const { questions, selectAnswer, questionNumber } = this.state;
    if (selectAnswer && questionNumber < questions.length - 1) {
      return (
        <button
          type="button"
          onClick={ this.changeQuestion }
          data-testid="btn-next"
        >
          Próxima
        </button>);
    } if (selectAnswer && questionNumber >= questions.length - 1) {
      return (
        <button
          type="button"
          onClick={ () => this.setState({ goToFeedback: true }) }
          data-testid="btn-next"
        >
          Próxima
        </button>);
    }
  }

  render() {
    const { questions, selectAnswer,
      questionNumber, renderTimer, sec, goToFeedback } = this.state;
    const selectedQuestion = questions[questionNumber];
    const tenSec = 10;
    const fixedTimer = sec >= tenSec ? `00:${sec}` : `00:0${sec}`;
    if (!selectedQuestion) {
      return (
        <p>Carregando...</p>
      );
    } if (goToFeedback) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        {renderTimer ? this.timerQuestion() : fixedTimer }
        <h1 data-testid="question-category">
          {selectedQuestion.category}
        </h1>
        <p data-testid="question-text">
          {selectedQuestion.question}
        </p>
        <button
          data-testid="correct-answer"
          className="true"
          type="button"
          onClick={ () => this.addWrongBorder(selectedQuestion.difficulty) }
          disabled={ selectAnswer }
        >
          {selectedQuestion.correct_answer}
        </button>
        {this.incorrectAnswers()}
        {this.buttons()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  gravatarEmail: state.playerReducer.gravatarEmail,
  score: state.playerReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUserScore: (score) => dispatch(userScore(score)),
});

Questions.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  dispatchUserScore: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
