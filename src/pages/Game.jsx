import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    this.setState({
      questions: data.results[0],
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    const {
      questions: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } } = this.state;
    return (
      <div>
        <Header />
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <button type="button" data-testid="correct-answer">{correctAnswer}</button>
        { incorrectAnswers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
          >
            {answer}
          </button>)) }
      </div>
    );
  }
}
