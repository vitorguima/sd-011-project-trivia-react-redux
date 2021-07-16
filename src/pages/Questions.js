import React, { Component } from 'react';
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
      enableButtons: true,
      selectAnswer: false,
      sec: 0,
    };
    this.getQuestions = this.getUnities.bind(this);
    this.handleEnableButton = this.handleEnableButton.bind(this);
    this.addWrongBorder = this.addWrongBorder.bind(this);
    this.funcSetTime = this.funcSetTime.bind(this);
    this.setRanking = this.setRanking.bind(this);
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
    this.setState({ selectAnswer: true });
    clearInterval(setTime);
    this.setRanking(difficulty);
  }

  incorrectAnswers() {
    const { questions, enableButtons, selectAnswer } = this.state;
    const getQuestion = questions[0];
    const selectedQuestion = getQuestion && getQuestion.incorrect_answers;
    return selectedQuestion && selectedQuestion.map((question, index) => (
      <button
        className="wrong"
        type="button"
        key={ question }
        data-testid={ `wrong-answer-${index}` }
        onClick={ () => this.addWrongBorder('wrong') }
        disabled={ !selectAnswer ? enableButtons : true }
      >
        {question}
      </button>));
  }

  handleEnableButton(sec) {
    const { enableButtons } = this.state;
    const num = 26;
    if (sec < num && sec > 0 && enableButtons) {
      this.setState({ enableButtons: false, sec });
    } else if (sec <= 0 && !enableButtons) {
      this.setState({ enableButtons: true, sec });
      this.addWrongBorder('wrong');
    }
  }

  funcSetTime(setTime) {
    this.setState({ setTime });
  }

  render() {
    const { questions, enableButtons, selectAnswer } = this.state;
    const selectedQuestion = questions[0];
    return (
      <div>
        {selectedQuestion && <Timer
          handleEnableButton={ this.handleEnableButton }
          funcSetTime={ this.funcSetTime }
        />}
        <h1 data-testid="question-category">
          {selectedQuestion && selectedQuestion.category}
        </h1>
        <p data-testid="question-text">
          {selectedQuestion && selectedQuestion.question}
        </p>
        <button
          data-testid="correct-answer"
          className="true"
          type="button"
          onClick={ () => this.addWrongBorder(selectedQuestion.difficulty) }
          disabled={ !selectAnswer ? enableButtons : true }
        >
          {selectedQuestion && selectedQuestion.correct_answer}
        </button>
        {this.incorrectAnswers()}
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
