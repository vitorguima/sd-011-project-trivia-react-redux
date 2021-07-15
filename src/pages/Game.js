import React, { Component } from 'react';
import Header from '../components/Header';
import './css/Game.css';

class Game extends Component {
  constructor() {
    super();

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.fetchTriviaApi = this.fetchTriviaApi.bind(this);
    this.storeTokenOnLocalStorage = this.storeTokenOnLocalStorage.bind(this);
    this.renderShowAnswer = this.renderShowAnswer.bind(this);

    this.state = {
      questions: [],
      questionNum: 0,
      loading: true,
      showIncorrectAnswer: '',
      showCorrectAnswer: '',
    };
  }

  componentDidMount() {
    this.fetchTriviaApi();
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
    console.log(token);

    this.storeTokenOnLocalStorage(token);
  }

  async fetchQuestions(token) {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();

    console.log(questions.results);

    this.setState({
      questions: questions.results,
      loading: false,
    });
  }

  renderShowAnswer() {
    this.setState({
      showIncorrectAnswer: 'incorrect',
      showCorrectAnswer: 'correct',
    });
  }

  renderQuestions() {
    const { questions, questionNum } = this.state;

    return (
      <>
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
    const { showIncorrectAnswer, showCorrectAnswer } = this.state;

    if (question.type === 'multiple') {
      const incorrectAnswers = question.incorrect_answers.map((answer, index) => (
        <button
          data-testid={ `wrong-answer-${index}` }
          type="button"
          key={ index }
          className={ showIncorrectAnswer }
          onClick={ this.renderShowAnswer }
        >
          { answer }
        </button>
      ));
      return (
        <>
          {incorrectAnswers}
          <button
            data-testid="correct-answer"
            type="button"
            className={ showCorrectAnswer }
            onClick={ this.renderShowAnswer }
          >
            { question.correct_answer }
          </button>
        </>
      );
    }
    return (
      <>
        <button
          data-testid={ `wrong-answer-${0}` }
          type="button"
          className={ showIncorrectAnswer }
          onClick={ this.renderShowAnswer }
        >
          { question.incorrect_answers[0] }
        </button>
        <button
          data-testid="correct-answer"
          type="button"
          className={ showCorrectAnswer }
          onClick={ this.renderShowAnswer }
        >
          { question.correct_answer }
        </button>
      </>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Header />
        {
          loading ? <div>Carregando</div> : this.renderQuestions()
        }
        <div>
          <h2>Categoria da pergunta</h2>
          <div>
            Alternativas
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
