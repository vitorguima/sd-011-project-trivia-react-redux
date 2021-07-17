import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
      questionNumber: 0,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.counter = this.counter.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.buttonRedirect = this.buttonRedirect.bind(this);
  }

  componentDidMount() {
    const { tokenData, fetchQuestion } = this.props;
    fetchQuestion(tokenData);

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
    const { questionData, score, userName } = this.props;
    const questionDifficulty = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const { currentScore, questionNumber } = this.state;
    const { difficulty } = questionData[questionNumber];

    const scorePoints = 10;
    const questionScore = (
      currentScore
      + (scorePoints
      + (currentCounter * questionDifficulty[difficulty]))
    );
    const state = JSON.parse(localStorage.getItem('state'));

    this.setState({ currentScore: questionScore });

    state.player.score = questionScore;
    state.player.name = userName;
    state.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(state));

    score(questionScore);
  }

  nextQuestion() {
    const { questionNumber } = this.state;
    const id = questionNumber + 1;
    this.setState({
      questionNumber: id,
      toggleButton: false,
      currentCounter: 30,
      isAnswered: false,
    });
    this.counter();
  }

  buttonRedirect() {
    const { questionData } = this.props;
    const { questionNumber } = this.state;
    if (!questionData.length) {
      return (<h2>Loading questions...</h2>);
    }
    if (questionNumber < questionData.length) {
      return this.renderQuestions();
    }
    return (<Redirect to="/feedback" />);
  }

  renderQuestions() {
    const { questionData } = this.props;
    const { toggleButton, currentCounter, isAnswered, questionNumber } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionData[questionNumber];

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
          { incorrectAnswers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ () => this.handleAnswer(false) }
              className={ toggleButton ? 'incorrect-btn' : null }
              disabled={ currentCounter === 0 || isAnswered }
            >
              { answer }
            </button>
          ))}
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.nextQuestion() }
          hidden={ !(currentCounter === 0 || isAnswered) }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { currentCounter } = this.state;
    return (
      <div className="main-container">
        { this.buttonRedirect() }
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
  score: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};
