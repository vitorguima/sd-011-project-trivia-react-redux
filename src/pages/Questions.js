import React, { Component } from 'react';
import '../styles/Questions.css';

export default class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
    this.getQuestions = this.getUnities.bind(this);
  }

  async componentDidMount() {
    this.getUnities();
  }

  async getUnities() {
    const token = localStorage.getItem('token');
    const api = `https://opentdb.com/api.php?amount=5&token${token}`;
    const questions = await fetch(api)
      .then((result) => result.json());

    this.setState(() => ({
      questions: questions.results,
    }));
  }

  addWrongBorder() {
    const wrong = [...document.getElementsByClassName('wrong')];
    const tru = [...document.getElementsByClassName('true')];
    tru.forEach((node) => { node.className = 'true-answer'; });
    wrong.forEach((node) => { node.className = 'wrong-answer'; });
  }

  incorrectAnswers() {
    const { questions } = this.state;
    const getQuestion = questions[0];
    const selectedQuestion = getQuestion && getQuestion.incorrect_answers;
    return selectedQuestion && selectedQuestion.map((question, index) => (
      <button
        type="button"
        key={ question }
        data-testid={ `wrong-answer-${index}` }
        className="wrong"
        type="button"
        key={ question }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.addWrongBorder }
      >
        {question}
      </button>));
  }

  render() {
    const { questions } = this.state;
    const selectedQuestion = questions[0];
    return (
      <div>
        <h1 data-testid="question-category">
          {selectedQuestion && selectedQuestion.category}
        </h1>
        <p data-testid="question-text">
          {selectedQuestion && selectedQuestion.question}
        </p>
        <button data-testid="correct-answer" type="button">
        <button
          data-testid="correct-answer"
          className="true"
          type="button"
          onClick={ this.addWrongBorder }
        >
          {selectedQuestion && selectedQuestion.correct_answer}
        </button>
        {this.incorrectAnswers()}
      </div>
    );
  }
}
