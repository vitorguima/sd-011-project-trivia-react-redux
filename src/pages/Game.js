import React from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions } from '../services';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      indexQuestion: 0,
      showCorrect: false,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setShowCorrect = this.setShowCorrect.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const response = await getQuestions(token);
    this.setState({
      questions: response.results,
    });
  }

  setShowCorrect() {
    this.setState({
      showCorrect: true,
    });
  }

  nextQuestion() {
    this.setState((old) => ({
      indexQuestion: old.indexQuestion + 1,
      showCorrect: false,
    }));
  }

  render() {
    const { questions, indexQuestion, showCorrect } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        {questions.length > 0
          && <Question
            question={ questions[indexQuestion] }
            nextQuestion={ this.nextQuestion }
            showCorrect={ showCorrect }
            setShowCorrect={ this.setShowCorrect }
          /> }
      </div>
    );
  }
}

export default Game;
