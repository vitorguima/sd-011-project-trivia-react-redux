import React, { Component } from 'react';
import questionAPI from '../services';
import Header from './Header';
import '../App.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: undefined,
      correct: false,
      incorrect: false,
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

  handleClick() {
    this.setState({
      incorrect: true,
      correct: true,
    });
  }

  renderAnswers() {
    const { questions, index, incorrect } = this.state;
    const incorrectAnswers = questions[index].incorrect_answers;
    const multipleLength = 3;
    const redBorder = 'red-border';
    const regularBorder = 'regular-border';

    if (incorrectAnswers.length === multipleLength) {
      return (
        <div>
          <button
            type="button"
            data-testid={ `wrong-answer-${0}` }
            className={ incorrect ? redBorder : regularBorder }
            onClick={ () => this.handleClick(!incorrect) }
          >
            { incorrectAnswers[0] }
          </button>
          <button
            type="button"
            data-testid={ `wrong-answer-${1}` }
            className={ incorrect ? redBorder : regularBorder }
            onClick={ () => this.handleClick(!incorrect) }
          >
            { incorrectAnswers[1] }
          </button>
          <button
            type="button"
            data-testid={ `wrong-answer-${2}` }
            className={ incorrect ? redBorder : regularBorder }
            onClick={ () => this.handleClick(!incorrect) }
          >
            { incorrectAnswers[2] }
          </button>
        </div>
      );
    }
    return (
      <div>
        <button
          type="button"
          data-testid={ `wrong-answer-${0}` }
          className={ incorrect ? redBorder : regularBorder }
          onClick={ () => this.handleClick(!incorrect) }
        >
          { incorrectAnswers[0] }
        </button>
      </div>
    );
  }

  render() {
    const { questions, index, correct } = this.state;
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
              <h3>
                <button
                  type="button"
                  data-testid="correct-answer"
                  className={ correct ? 'green-border' : 'regular-border' }
                  onClick={ () => this.handleClick(!correct) }
                >
                  { questions[index].correct_answer }
                </button>
              </h3>
              <h3>{ this.renderAnswers() }</h3>
            </div>
          )}
      </div>
    );
  }
}

export default Questions;
