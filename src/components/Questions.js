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
      timer: 30,
      finishTimer: false,
      clicked: false,
      isDisabled: false,
      regularBorder: 'regular-border',
    };
  }

  componentDidMount() {
    this.handleQuestions();
    this.startTimer();
  }

  componentDidUpdate() {
    this.startTimer();
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
      clicked: true,
      isDisabled: true,
    });
  }

  startTimer() {
    const { timer, finishTimer, clicked } = this.state;
    const countTime = 1000;

    if (!clicked) {
      if (timer > 0) {
        setTimeout(() => this.setState({ timer: timer - 1 }), countTime);
      }
      if (timer === 0 && !finishTimer) {
        this.setState({
          finishTimer: true,
        });
        this.handleClick();
      }
    }
  }

  renderIncorrectAnswers() {
    const { questions, index, incorrect, regularBorder, isDisabled } = this.state;
    const incorrectAnswers = questions[index].incorrect_answers;
    const redBorder = 'red-border';
    return (
      <div>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid={ `wrong-answer-${0}` }
          className={ incorrect ? redBorder : regularBorder }
          onClick={ () => this.handleClick(!incorrect) }
        >
          { incorrectAnswers[0] }
        </button>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid={ `wrong-answer-${1}` }
          className={ incorrect ? redBorder : regularBorder }
          onClick={ () => this.handleClick(!incorrect) }
        >
          { incorrectAnswers[1] }
        </button>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid={ `wrong-answer-${2}` }
          className={ incorrect ? redBorder : regularBorder }
          onClick={ () => this.handleClick(!incorrect) }
        >
          { incorrectAnswers[2] }
        </button>
      </div>
    );
  }

  renderAnswers() {
    const { questions, index, incorrect, regularBorder, isDisabled } = this.state;
    const incorrectAnswers = questions[index].incorrect_answers;
    const multipleLength = 3;
    const redBorder = 'red-border';

    if (incorrectAnswers.length === multipleLength) {
      return this.renderIncorrectAnswers();
    }
    return (
      <div>
        <button
          type="button"
          disabled={ isDisabled }
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
    const { questions, index, correct, timer, isDisabled, regularBorder } = this.state;
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
                  disabled={ isDisabled }
                  type="button"
                  data-testid="correct-answer"
                  className={ correct ? 'green-border' : regularBorder }
                  onClick={ () => this.handleClick(!correct) }
                >
                  { questions[index].correct_answer }
                </button>
              </h3>
              <h3>{ this.renderAnswers() }</h3>
              <span>{ timer }</span>
            </div>
          )}
      </div>
    );
  }
}

export default Questions;
