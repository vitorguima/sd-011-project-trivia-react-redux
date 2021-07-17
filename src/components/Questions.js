import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { fetchQuestionsAPI, updateScore } from '../actions/game';
import './Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButton: false,
      currentCounter: 30,
      isAnswered: false,
      currentScore: 0,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.counter = this.counter.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
  }

  componentDidMount() {
    const { tokenData, fetchQuestion } = this.props;
    fetchQuestion(tokenData);
    let state = localStorage.getItem('state');
    if (!state) {
      state = {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
    }
    this.counter();
  }

  counter() {
    const time = 1000;
    this.questionTime = setInterval(this.handleCounter, time);
  }

  handleCounter() {
    const { currentCounter, isAnswered } = this.state;
    if (currentCounter > 0 && !isAnswered) {
      return this.setState((prevState) => ({
        currentCounter: prevState.currentCounter - 1,
      }));
    }
    if (currentCounter === 0 || isAnswered) {
      clearInterval(this.questionTime);
    }
  }

  handleAnswer(isCorrect) {
    const { currentCounter } = this.state;
    this.setState({
      toggleButton: true,
      isAnswered: true,
    });
    if (isCorrect) {
      this.scoreCalculator(currentCounter);
    }
  }

  scoreCalculator(currentCounter) {
    const { questionData, score } = this.props;
    const { difficulty } = questionData[0]; // mudar depois para pegar de forma dinâmica.
    const questionDifficulty = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const {currentScore} = this.state;
    const scorePoints = 10;
    const questionScore = currentScore + (scorePoints + (currentCounter * questionDifficulty[difficulty]));
    this.setState({ currentScore: questionScore });
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score = questionScore;
    localStorage.setItem('state', JSON.stringify(state));
    score(questionScore);
  }

  renderQuestions() {
    const { questionData } = this.props;
    const { toggleButton, currentCounter, isAnswered } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionData[0]; // aqui teremos que alterar pra pegar uma por vez

    return (
      <div className="questions-container">
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div className="buttons-container">
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ () => this.handleAnswer(true) }
            className={ toggleButton ? 'correct-btn' : null }
            disabled={ currentCounter === 0 || isAnswered }
          >
            { correctAnswer }
          </button>
          { incorrectAnswers.map((answer, inx) => (
            <button
              key={ inx }
              type="button"
              data-testid={ `wrong-answer-${inx}` }
              onClick={ () => this.handleAnswer(false) }
              className={ toggleButton ? 'incorrect-btn' : null }
              disabled={ currentCounter === 0 || isAnswered }
            >
              { answer }
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { questionData } = this.props;
    const { currentCounter, currentScore } = this.state;
    return (
      <div className="main-container">
        <Header score={ currentScore } />
        { questionData.length ? this.renderQuestions() : <h2>Loading questions...</h2>}
        <p>
          { currentCounter }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.login.user,
  userEmail: state.login.email,
  tokenData: state.login.token,
  questionData: state.game.questions,
  currentScore: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: (token) => dispatch(fetchQuestionsAPI(token)),
  score: (questionScore) => dispatch(updateScore(questionScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  tokenData: PropTypes.string.isRequired,
  questionData: PropTypes.arrayOf.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
};
