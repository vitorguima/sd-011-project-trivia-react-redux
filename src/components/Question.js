import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      anyChosed: false,
    };
    this.setRandom = this.setRandom.bind(this);
  }

  componentDidMount() {
    this.setRandom();
  }

  setRandom() {
    const max = 4;
    const random = Math.floor(Math.random() * max);
    this.setState({ randomNumber: random });
  }

  shufleAnswers(right, wrongs, random) {
    wrongs.splice(random, 0, right);
    return wrongs;
  }

  multipleQuestion() {
    const { anyChosed, randomNumber } = this.state;
    const { questionsArr, currentQuestion } = this.props;
    const rightAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        key="right"
        onClick={ () => this.setState({ anyChosed: true }) }
        className={ anyChosed ? 'correct' : '' }
      >
        { questionsArr[currentQuestion].correct_answer }
      </button>);
    const wrongAnswer = questionsArr[currentQuestion].incorrect_answers
      .map((item, index) => (
        <button
          type="button"
          key={ `wrong-${index}` }
          data-testid={ `wrong-answer-${index}` }
          onClick={ () => this.setState({ anyChosed: true }) }
          className={ anyChosed ? 'wrong' : '' }
        >
          { item }
        </button>
      ));
    const shufledAnswer = this.shufleAnswers(rightAnswer, wrongAnswer, randomNumber);
    return (
      <div className="answers">
        { shufledAnswer }
      </div>
    );
  }

  bolleanQuestion() {
    const { questionsArr, currentQuestion } = this.props;
    const { anyChosed } = this.state;
    if (questionsArr[currentQuestion].correct_answer) {
      return (
        <div className="answers">
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ () => this.setState({ anyChosed: true }) }
            className={ anyChosed ? 'correct' : '' }
          >
            True
          </button>

          <button
            type="button"
            data-testid="wrong-answer-0"
            onClick={ () => this.setState({ anyChosed: true }) }
            className={ anyChosed ? 'wrong' : '' }
          >
            False
          </button>
        </div>
      );
    }
    return (
      <div className="answers">

        <button
          type="button"
          data-testid="wrong-answer-0"
          onClick={ () => this.setState({ anyChosed: true }) }
          className={ anyChosed ? 'wrong' : '' }
        >
          True
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ () => this.setState({ anyChosed: true }) }
          className={ anyChosed ? 'correct' : '' }
        >
          False
        </button>
      </div>
    );
  }

  renderAwnserButtons() {
    const { questionsArr, currentQuestion } = this.props;
    if (questionsArr[currentQuestion].type === 'boolean') {
      return this.bolleanQuestion();
    }
    return this.multipleQuestion();
  }

  render() {
    const { questionsArr, currentQuestion } = this.props;
    return (
      <div>
        <p data-testid="question-text">
          {' '}
          { questionsArr[currentQuestion].question }
          {' '}
        </p>
        <p data-testid="question-category">
          {' '}
          { questionsArr[currentQuestion].category }
          {' '}
        </p>
        { this.renderAwnserButtons() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.questions.questionsArr,
  currentQuestion: state.questions.currentQuestion,
});

Question.propTypes = {
  questionsArr: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Question);
