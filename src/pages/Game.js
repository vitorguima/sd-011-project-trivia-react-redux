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
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    getQuestions(token).then((apiQuestions) => {
      this.setState({ questions: apiQuestions.results });
    });
  }

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        <Header />
        { (questions.length === 0)
          ? <p>loading...</p> : <Question newQuestion={ questions[index] } />}
      </div>
    );
  }
}

export default Game;
