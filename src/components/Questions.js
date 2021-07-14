import React, { Component } from 'react';
import questionAPI from '../services';
import Header from './Header';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: undefined,
    };
  }

  componentDidMount() {
    this.handleQuestions();
  }

  async handleQuestions() {
    const data = await questionAPI();
    this.setState({
      questions: data.results,
    });
  }

  renderAnswers() {
    const { questions, index } = this.state;
    const incorrectAnswers = questions[index].incorrect_answers;
    const multipleLength = 3;
    if (incorrectAnswers.length === multipleLength) {
      return (
        <div>
          <h3 data-testid={ `wrong-answer-${0}` }>{ incorrectAnswers[0] }</h3>
          <h3 data-testid={ `wrong-answer-${1}` }>{ incorrectAnswers[1] }</h3>
          <h3 data-testid={ `wrong-answer-${2}` }>{ incorrectAnswers[2] }</h3>
        </div>
      );
    }
    return (
      <div>
        <h3 data-testid={ `wrong-answer-${0}` }>{ incorrectAnswers[0] }</h3>
      </div>
    );
  }

  render() {
    const { questions, index } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        { !questions
          ? <p>Loading...</p>
          : (
            <div>
              <h3 data-testid="question-category">{ questions[index].category }</h3>
              <h3 data-testid="question-text">{ questions[index].question }</h3>
              <h3 data-testid="correct-answer">{ questions[index].correct_answer }</h3>
              <h3>{ this.renderAnswers() }</h3>
            </div>
          )}
      </div>
    );
  }
}

export default Questions;
