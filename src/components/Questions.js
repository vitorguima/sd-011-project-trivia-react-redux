import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      stopTimer: false,
      answered: false,
    };
  }

  componentDidMount() {
    this.startTimer();
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
      if (timer === 0 && stopTimer) {
        this.setState({ stopTimer: true });
      }
    }
  }

  render() {
    const { timer } = this.state;
    const { newQuestion:
      { question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
        category,
      } } = this.props;
    const randomAnswers = [correctAnswer, ...incorrectAnswers]
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    return (
      <div>
        <span>{ timer }</span>
        <h1 data-testid="question-text">
          { question }
        </h1>
        <p data-testid="question-category">{ category }</p>
        {randomAnswers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                type="button"
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
            >
              {answer}
            </button>
          );
        })}
      </div>

    );
  }
}

Question.propTypes = {
  newQuestion: PropTypes.isRequired,
};

export default Question;
