import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      stopTimer: false,
      answers: [],
      answered: false,
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.startTimer();
    this.randomAnswers();
  }

  componentDidUpdate() {
    this.startTimer();
  }

  startTimer() {
    const { timer, stopTimer, answered } = this.state;
    const oneSecond = 1000;

    if (!answered) {
      if (timer > 0) {
        setTimeout(() => this.setState({ timer: timer - 1 }), oneSecond);
      }
      if (timer === 0 && !stopTimer) {
        this.setState({ stopTimer: true, isDisabled: true });
      }
    }
  }

  randomAnswers() {
    const { newQuestion:
      { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } } = this.props;
    const randomAnswers = [correctAnswer, ...incorrectAnswers]
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    this.setState({ answers: randomAnswers });
  }

  handleClick() {
    this.setState({
      isDisabled: true,
      answered: true,
      stopTimer: true,
    });
  }

  render() {
    const { timer, answers, isDisabled } = this.state;
    const { newQuestion:
      { question,
        correct_answer: correctAnswer,
        category,
      } } = this.props;
    return (
      <div>
        <span>{ timer }</span>
        <h1 data-testid="question-text">
          { question }
        </h1>
        <p data-testid="question-category">{ category }</p>
        { answers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                type="button"
                disabled={ isDisabled }
                onClick={ () => this.handleClick() }
              >
                {answer}
              </button>
            );
          }
          return (
            <button
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              disabled={ isDisabled }
              onClick={ () => this.handleClick() }
            >
              {answer}
            </button>
          );
        }) }
      </div>
    );
  }
}

Question.propTypes = {
  newQuestion: PropTypes.isRequired,
};

export default Question;
