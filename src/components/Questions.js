import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './questions.css';
import { fetchQuestions, submitScore } from '../actions';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: 0,
      totalScore: 0,
      showNextButton: false,
      timeCount: 30,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleNextStyle = this.handleNextStyle.bind(this);
    this.handleCorretAnswer = this.handleCorretAnswer.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.handleErrorAnswer = this.handleErrorAnswer.bind(this);
    this.timerCounter = this.timerCounter.bind(this);
    this.handleStyleAnswers = this.handleStyleAnswers.bind(this);
    this.renderCorretBtn = this.renderCorretBtn.bind(this);
    this.renderWrongBtn = this.renderWrongBtn.bind(this);
    this.handleDisableButtons = this.handleDisableButtons.bind(this);
  }

  async componentDidMount() {
    const { getQuestions, token } = this.props;
    await getQuestions(token);
    this.timerCounter();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { timeCount } = this.state;
    nextState = 0;
    return (timeCount > nextState);
  }

  componentWillUnmount() {
    clearInterval(this.myInteval);
  }

  timerCounter() {
    const intervalTimer = 1000;
    this.myInteval = setInterval(() => {
      this.setState((prevState) => ({
        timeCount: prevState.timeCount - 1,
      }));
    }, intervalTimer);
  }

  handleNext() {
    const { indexQuestion } = this.state;
    const maxQuestions = 5;
    if (indexQuestion <= maxQuestions) {
      this.setState({
        indexQuestion: indexQuestion + 1,
        showNextButton: false,
      }, () => this.handleLocalStorage());
    }
  }

  handleNextStyle() {
    const styleAnswers = document.getElementsByName('answer');
    styleAnswers.forEach((answerBtn) => { answerBtn.style = ''; });
  }

  handleCorretAnswer() {
    this.setState((state) => ({
      totalScore: state.totalScore + 1,
      showNextButton: true,
    }));
  }

  handleDisableButtons() {
    const { showNextButton } = this.state;
    if (showNextButton) {
      return true;
    }
    return false;
  }

  handleErrorAnswer() {
    this.setState(() => ({
      showNextButton: true,
    }));
  }

  handleStyleAnswers() {
    const styleAnswers = document.getElementsByName('answer');
    styleAnswers.forEach((answerBtn) => {
      if (answerBtn.getAttribute('data-testid') === 'correct-answer') {
        answerBtn.style = 'border: 3px solid rgb(6, 240, 15)';
      } else {
        answerBtn.style = 'border: 3px solid rgb(255, 0, 0)';
      }
    });
  }

  handleLocalStorage() {
    const { totalScore } = this.state;
    const retrievelocalStorage = JSON.parse(localStorage.getItem('state'));
    retrievelocalStorage.player.score = totalScore;
    localStorage.setItem('state', JSON.stringify(retrievelocalStorage));
  }

  renderCorretBtn(answer, index) {
    const { timeCount } = this.state;
    return (
      <button
        className="answer"
        key={ index }
        type="button"
        data-testid="correct-answer"
        disabled={ timeCount === 0 || this.handleDisableButtons() }
        name="answer"
        onClick={ () => {
          this.handleCorretAnswer();
          this.handleStyleAnswers();
        } }
      >
        {answer}
      </button>);
  }

  renderWrongBtn(answer, index) {
    const { timeCount } = this.state;
    return (
      <button
        className="wrong-answer"
        key={ index }
        type="button"
        onClick={ () => {
          this.handleErrorAnswer();
          this.handleStyleAnswers();
        } }
        data-testid={ `wrong-answer-${index}` }
        disabled={ timeCount === 0 || this.handleDisableButtons() }
        name="answer"
      >
        {answer}
      </button>);
  }

  render() {
    const { questions, disapatchScore } = this.props;
    const { indexQuestion, showNextButton, timeCount, totalScore } = this.state;
    const maxIndexQuestion = 4;
    if (indexQuestion > maxIndexQuestion) {
      return <Redirect to="/feedback" />;
    }
    if (questions.length && indexQuestion <= maxIndexQuestion) {
      const correctAnswer = questions[indexQuestion].correct_answer;
      const incorrectAnswers = questions[indexQuestion].incorrect_answers;
      const answers = [correctAnswer, ...incorrectAnswers].sort();
      const { category, question } = questions[indexQuestion];
      return (
        <section className="section-question">
          <div className="category" data-testid="question-category">{ category }</div>
          <div className="question" data-testid="question-text">{ question }</div>
          <span>{timeCount}</span>
          {answers.map((answer, index) => {
            if (answer === correctAnswer) {
              return (
                this.renderCorretBtn(answer, index));
            }
            return (
              this.renderWrongBtn(answer, index));
          })}

          {showNextButton && (
            <button
              type="button"
              className="btn-next"
              data-testid="btn-next"
              onClick={ () => {
                this.handleNext();
                this.handleNextStyle();
                disapatchScore(totalScore);
              } }
            >
              Próxima
            </button>)}
        </section>
      );
    }
    return <section className="loading">carregando...</section>;
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  getQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
  disapatchScore: (score) => dispatch(submitScore(score)),
});

const mapStateToProps = (state) => ({
  token: state.homeReducer.token,
  questions: state.homeReducer.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
