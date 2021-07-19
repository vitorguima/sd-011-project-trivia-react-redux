import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionScore } from '../actions';
import './css/Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.fetchTriviaApi = this.fetchTriviaApi.bind(this);
    this.storeTokenOnLocalStorage = this.storeTokenOnLocalStorage.bind(this);
    this.renderShowAnswer = this.renderShowAnswer.bind(this);
    this.renderTimeAnswer = this.renderTimeAnswer.bind(this);
    this.savePlayerLocal = this.savePlayerLocal.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);

    const { score } = this.props;
    this.state = {
      questions: [],
      questionNum: 0,
      loading: true,
      showIncorrectAnswer: '',
      showCorrectAnswer: '',
      timer: 30,
      disabled: false,
      countdown: '',
      score,
      assertions: 0,
    };
  }

  componentDidMount() {
    this.fetchTriviaApi();
    this.renderTimeAnswer();
    const teste = { player: { name: '', assertions: 0, score: 0, gravatarEmail: '' } };
    localStorage.setItem('state', JSON.stringify(teste));
  }

  getTokenOnLocalStorage() {
    const tokenStr = localStorage.getItem('token');
    const tokenObj = JSON.parse(tokenStr);
    this.fetchQuestions(tokenObj.token);
  }

  storeTokenOnLocalStorage(tokenObj) {
    localStorage.setItem('token', JSON.stringify(tokenObj));
    this.getTokenOnLocalStorage();
  }

  async fetchTriviaApi() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    this.storeTokenOnLocalStorage(token);
  }

  async fetchQuestions(token) {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();

    this.setState({
      questions: questions.results,
      loading: false,
    });
  }

  savePlayerLocal() {
    const { score, assertions } = this.state;
    const { name, gravatarEmail, addingScore } = this.props;
    const teste = { player: { name, assertions, score, gravatarEmail } };
    localStorage.setItem('state', JSON.stringify(teste));
    addingScore(score, assertions);
  }

  goToNextQuestion() {
    const { questionNum, countdown } = this.state;
    const maxQuestionNumIndex = 4;
    clearInterval(countdown);

    if (questionNum < maxQuestionNumIndex) {
      this.setState({
        showIncorrectAnswer: '',
        showCorrectAnswer: '',
        timer: 30,
        disabled: false,
        countdown: '',
      }, this.renderTimeAnswer());
      this.setState((prevstate) => ({ questionNum: prevstate.questionNum + 1 }));
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  renderShowAnswer({ target: { id } }) {
    this.setState({
      showIncorrectAnswer: 'incorrect',
      showCorrectAnswer: 'correct',
      disabled: true,
    });

    const { countdown, timer, questions, questionNum } = this.state;
    const { difficulty } = questions[questionNum];
    const three = 3;
    let difficultyPoints = three;

    if (difficulty === 'easy') {
      difficultyPoints = 1;
    } else if (difficulty === 'medium') {
      difficultyPoints = 2;
    }

    const ten = 10;
    const result = ten + (timer * difficultyPoints);

    if (id === 'right') {
      this.setState(({ score, assertions }) => ({
        score: score + result,
        assertions: assertions + 1,
      }), () => {
        this.savePlayerLocal();
      });
    }

    clearInterval(countdown);
  }

  renderTimeAnswer() {
    const second = 1000;
    const { timer } = this.state;

    if (timer > 0) this.setState({ timer: timer - 1, disabled: false });

    const countdown = setTimeout(this.renderTimeAnswer, second);
    this.setState({ countdown });

    if (timer === 0) {
      this.setState({ disabled: true });
    }
  }

  renderQuestions() {
    const { questions, questionNum, timer } = this.state;

    return (
      <>
        <span>{ `Tempo: ${timer}` }</span>
        <h1 data-testid="question-text">
          { questions[questionNum].question }
        </h1>
        <h2 data-testid="question-category">
          { questions[questionNum].category }
        </h2>
        {this.renderAnswers(questions[questionNum])}
      </>
    );
  }

  renderAnswers(question) {
    const { showIncorrectAnswer, showCorrectAnswer, disabled } = this.state;
    let incorrectAnswers;
    if (question.type === 'multiple') {
      incorrectAnswers = question.incorrect_answers.map((answer, index) => (
        <button
          data-testid={ `wrong-answer-${index}` }
          type="button"
          key={ index }
          id="wrong"
          className={ showIncorrectAnswer }
          onClick={ this.renderShowAnswer }
          disabled={ disabled }
        >
          { answer }
        </button>
      ));
    } else {
      incorrectAnswers = (
        <button
          data-testid="wrong-answer-0"
          id="wrong"
          type="button"
          className={ showIncorrectAnswer }
          onClick={ this.renderShowAnswer }
          disabled={ disabled }
        >
          { question.incorrect_answers[0] }
        </button>
      );
    }
    return (
      <>
        {incorrectAnswers}
        <button
          data-testid="correct-answer"
          type="button"
          id="right"
          className={ showCorrectAnswer }
          onClick={ this.renderShowAnswer }
          disabled={ disabled }
        >
          { question.correct_answer }
        </button>
      </>
    );
  }

  render() {
    const { loading, disabled } = this.state;
    return (
      <div>
        <Header />
        { loading ? <div>Carregando</div> : this.renderQuestions() }
        { disabled ? (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.goToNextQuestion }
          >
            Proxima
          </button>
        ) : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  addingScore: (score, assertions) => dispatch(actionScore(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
