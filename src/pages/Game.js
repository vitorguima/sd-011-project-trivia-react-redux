import React from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };

    this.getQuestions = this.getQuestions.bind(this);
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

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{ questions[0].category }</p>
            <p data-testid="question-text">{ questions[0].question }</p>
            <p data-testid="correct-answer">{ questions[0].correct_answer }</p>
            { questions[0].incorrect_answers.map((inc, index) => (
              <p data-testid={ `wrong-answer-${index}` } key={ index }>{ inc }</p>
            )) }
          </div>
        )}
      </div>
    );
  }
}

export default Game;
