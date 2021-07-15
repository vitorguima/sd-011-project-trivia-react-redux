import React from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import Question from '../components/Questions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: 0,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    getQuestions(token).then((apiQuestions) => {
      this.setState({ questions: apiQuestions.results });
    });
  }

  render() {
    const { questions, question } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        <Question newQuestion={ questions[question] } />
      </div>
    );
  }
}

export default Game;
