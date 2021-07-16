import React from 'react';
import PropTypes from 'prop-types';

import '../style/question.css';

let timeout;
let timeout2;

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 0,
    };

    this.setTimer = this.setTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  componentDidMount() {
    this.setInitialState();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { timer: initialTimer } = this.props;
    const second = 1000;
    if (timer === initialTimer) {
      timeout = setTimeout(() => this.clearTimer(), timer * second);
      timeout2 = setInterval(this.setTimer, second);
    }
  }

  setTimer() {
    this.setState((old) => ({
      timer: old.timer - 1,
    }));
  }

  setInitialState() {
    const { timer } = this.props;
    this.setState({
      timer,
    });
  }

  clearTimer() {
    const { setShowCorrect } = this.props;
    clearInterval(timeout);
    clearInterval(timeout2);
    // To Dispatch para o score
    setShowCorrect();
  }

  handleClickNext() {
    const { nextQuestion } = this.props;
    this.setState({
      timer: 30,
    });
    nextQuestion();
  }

  render() {
    const { showCorrect, question: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;

    const { timer } = this.state;

    return (
      <div>
        <h3>
          Timer:
          { timer }
        </h3>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          type="button"
          onClick={ this.clearTimer }
          data-testid="correct-answer"
          className={ showCorrect && 'correct' }
          disabled={ showCorrect }
        >
          { correctAnswer }
        </button>
        { incorrectAnswers.map((inc, index) => (
          <button
            type="button"
            onClick={ this.clearTimer }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ showCorrect && 'incorrect' }
            disabled={ showCorrect }
          >
            { inc }
          </button>
        )) }
        { showCorrect
          && <button type="button" onClick={ this.handleClickNext }>Próximo</button> }
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
  setShowCorrect: PropTypes.func.isRequired,
  showCorrect: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.string,
  }).isRequired,
};
