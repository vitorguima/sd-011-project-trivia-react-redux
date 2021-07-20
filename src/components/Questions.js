import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestionsAPI, updateScore } from '../actions/game';
import updateRanking from '../helpers/updateRanking';
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
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  componentDidMount() {
    const {
      tokenData,
      questionCategory,
      questionDifficulty,
      questionType,
      fetchQuestion } = this.props;
    fetchQuestion(tokenData, questionCategory, questionDifficulty, questionType);
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

  renderQuestions() {
    const { questionData } = this.props;
    const { questionNumber } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questionData[questionNumber];
    const answers = [...incorrectAnswers, correctAnswer];

    return (
      <div className="questions-container">
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div className="buttons-container">
          { answers.sort().map((answer, index) => (
            (answer === correctAnswer)
              ? this.renderCorrectAnswerButton(answer)
              : this.renderIncorrectAnswersButton(answer, index)
          ))}
        </div>
      </div>
    );
  }

  renderCorrectAnswerButton(answer) {
    const { toggleButton, currentCounter, isAnswered } = this.state;
    return (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ () => this.handleAnswer(true) }
        className={ toggleButton ? 'correct-btn' : null }
        disabled={ currentCounter === 0 || isAnswered }
      >
        { answer }
      </button>
    );
  }

  renderIncorrectAnswersButton(answer, index) {
    const { toggleButton, currentCounter, isAnswered } = this.state;
    return (
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
    );
  }

  renderNextButton() {
    const { questionNumber } = this.state;
    const { questionData, imageURL } = this.props;
    if (questionData.length - 1 === questionNumber) {
      return (
        <Link to="/feedback">
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => updateRanking(imageURL) }
          >
            Próxima
          </button>
        </Link>
      );
    }
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => this.nextQuestion() }
      >
        Próxima
      </button>
    );
  }

  render() {
    const { currentCounter, isAnswered } = this.state;
    const { questionData } = this.props;
    return (
      <div className="main-container">
        { questionData.length > 0 ? this.renderQuestions() : <p>Carregando...</p>}
        <p>
          { currentCounter }
        </p>
        { (currentCounter === 0 || isAnswered) ? this.renderNextButton() : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.login.user,
  userEmail: state.login.email,
  imageURL: state.game.gravatarImage,
  tokenData: state.login.token,
  questionData: state.game.questions,
  currentScore: state.game.score,
  questionCategory: state.settings.category,
  questionDifficulty: state.settings.difficulty,
  questionType: state.settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: (token,
    questionCategory,
    questionDifficulty,
    questionType) => dispatch(fetchQuestionsAPI(token,
    questionCategory,
    questionDifficulty,
    questionType)),
  score: (questionScore) => dispatch(updateScore(questionScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  tokenData: PropTypes.string.isRequired,
  questionData: PropTypes.arrayOf.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  score: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  questionCategory: PropTypes.string.isRequired,
  questionDifficulty: PropTypes.string.isRequired,
  questionType: PropTypes.string.isRequired,
};
