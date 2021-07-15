import React from 'react';
import Header from '../components/Header';
import { getToken, getQuestions } from '../services/api';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    getToken().then(getQuestions).then((apiQuestions) => {
      this.setState({ questions: apiQuestions });
    });
  }

  render() {
    const { questions } = this.state;
    return (
      <Header />
    );
  }
}

export default Game;
