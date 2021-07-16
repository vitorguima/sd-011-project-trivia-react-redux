import React from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import Question from '../components/Questions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      index: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    getQuestions(token).then((apiQuestions) => {
      const results = apiQuestions.results.map((element) => {
        const { category, question, correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = element;
        const newCorrectAnswer = { answer: correctAnswer, correct: true };
        const newIncorrectAnswers = incorrectAnswers.map((element) => ({ answer: element, correct: false }));
        const answers = [newCorrectAnswer, ...newIncorrectAnswers];
        return {
          question,
          category,
          answers,
        };
      });
      this.setState({ questions: results });
    });
  }

  randomAnswers(array) {
    const randomAnswers = array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    return randomAnswers;
  }

  nextQuestion() {
    const { index } = this.state;
    const four = 4;
    if (index < four) {
      this.setState((state) => ({ index: state.index + 1 }));
    }
  }

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        <Header />
        { (questions.length === 0)
          ? <p>loading...</p>
          : <Question newQuestion={ questions[index] } nextFunc={ this.nextQuestion } />}
      </div>
    );
  }
}

export default Game;
