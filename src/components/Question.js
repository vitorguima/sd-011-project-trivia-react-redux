import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      anyChosed: false,
    };
    this.setRandom = this.setRandom.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    const { startCountdownAction } = this.props;
    this.setRandom();
    startCountdownAction();
  }

  componentDidUpdate() {
    const { timer } = this.props;
    const { anyChosed } = this.state;
    if (timer <= 0 && anyChosed === false) {
      this.timesUp();
    }
  }

  setRandom() {
    const max = 4;
    const random = Math.floor(Math.random() * max);
    this.setState({ randomNumber: random });
  }

  checkAnswer(answer) {
    const { timer, questionsArr, currentQuestion, updateScoreAction } = this.props;
    if (answer === 'incorret') {
      return;
    }
    const obj = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const base = 10;
    const dificulty = questionsArr[currentQuestion].difficulty;
    const score = (base + (timer * obj[dificulty]));
    updateScoreAction(score);
  }

  timesUp() {
    const { stopCountdownAction } = this.props;
    stopCountdownAction();
    this.setState({
      anyChosed: true,
    });
    this.checkAnswer('incorrect');
  }

  buttonClicked({ target }) {
    const { stopCountdownAction } = this.props;
    stopCountdownAction();
    this.setState({
      anyChosed: true,
    });
    this.checkAnswer(target.dataset.answer);
  }

  nextQuestion() {
    const {
      currentQuestion,
      history,
      nextQuestionAction,
      saveRankAction,
      startCountdownAction } = this.props;
    const numOfQuestions = 4;
    if (currentQuestion >= numOfQuestions) {
      saveRankAction();
      history.push('/feedback');
    } else {
      nextQuestionAction();
      this.setState({
        anyChosed: false,
      });
      startCountdownAction();
    }
  }

  shufleAnswers(right, wrongs, random) {
    wrongs.splice(random, 0, right);
    return wrongs;
  }

  multipleQuestion() {
    const { anyChosed, randomNumber } = this.state;
    const { questionsArr, currentQuestion } = this.props;
    const rightAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        data-answer="correct"
        key="right"
        onClick={ this.buttonClicked }
        className={ anyChosed ? 'correct' : '' }
        disabled={ anyChosed }
      >
        { questionsArr[currentQuestion].correct_answer }
      </button>);
    const wrongAnswer = questionsArr[currentQuestion].incorrect_answers
      .map((item, index) => (
        <button
          type="button"
          key={ `wrong-${index}` }
          data-testid={ `wrong-answer-${index}` }
          data-answer="incorret"
          onClick={ this.buttonClicked }
          className={ anyChosed ? 'wrong' : '' }
          disabled={ anyChosed }
        >
          { item }
        </button>
      ));
    const shufledAnswer = this.shufleAnswers(rightAnswer, wrongAnswer, randomNumber);
    return (
      <div className="answers">
        { shufledAnswer }
      </div>
    );
  }

  bolleanQuestion() {
    const { questionsArr, currentQuestion } = this.props;
    const { anyChosed } = this.state;
    if (questionsArr[currentQuestion].correct_answer) return this.renderTrueFalse();
    return (
      <div className="answers">
        <button
          type="button"
          data-testid="wrong-answer-0"
          data-answer="incorret"
          onClick={ this.buttonClicked }
          className={ anyChosed ? 'wrong' : '' }
          disabled={ anyChosed }
        >
          True
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          data-answer="correct"
          onClick={ this.buttonClicked }
          className={ anyChosed ? 'correct' : '' }
          disabled={ anyChosed }
        >
          False
        </button>
      </div>
    );
  }

  renderTrueFalse() {
    const { anyChosed } = this.state;
    return (
      <div className="answers">
        <button
          type="button"
          data-testid="correct-answer"
          data-answer="correct"
          onClick={ this.buttonClicked }
          className={ anyChosed ? 'correct' : '' }
          disabled={ anyChosed }
        >
          True
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          data-answer="incorret"
          onClick={ this.buttonClicked }
          className={ anyChosed ? 'wrong' : '' }
          disabled={ anyChosed }
        >
          False
        </button>
      </div>
    );
  }

  renderNextButton() {
    return (
      <button type="button" data-testid="btn-next" onClick={ this.nextQuestion }>
        Próxima
      </button>
    );
  }

  renderAwnserButtons() {
    const { questionsArr, currentQuestion } = this.props;
    if (questionsArr[currentQuestion].type === 'boolean') return this.bolleanQuestion();
    return this.multipleQuestion();
  }

  render() {
    const { questionsArr, currentQuestion, timer } = this.props;
    const { anyChosed } = this.state;
    return (
      <div>
        <p data-testid="question-text">
          { questionsArr[currentQuestion].question }
        </p>
        <p data-testid="question-category">
          { questionsArr[currentQuestion].category }
        </p>
        { this.renderAwnserButtons() }
        {anyChosed ? this.renderNextButton() : ''}
        <h3>
          { timer }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.questions.questionsArr,
  currentQuestion: state.questions.currentQuestion,
  timer: state.questions.timer,
});

const mapDispatchToProps = (dispatch) => ({
  startCountdownAction: () => dispatch(actions.startCountdown()),
  stopCountdownAction: () => dispatch(actions.stopCountdown()),
  updateScoreAction: (score) => dispatch(actions.updateScore(score)),
  nextQuestionAction: () => dispatch(actions.nextQuestion()),
  saveRankAction: () => dispatch(actions.saveRank()),
});

Question.propTypes = {
  questionsArr: PropTypes.arrayOf(PropTypes.object),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Question));
