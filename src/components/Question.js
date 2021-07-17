import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nextQuestion } from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      hasAnswered: false,
    };
    this.buttonClicked = this.buttonClicked.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  buttonClicked() {
    this.setState({
      hasAnswered: true,
    });
  }

  nextQuestion() {
    const { currentQuestion, history, nextQuestionAction } = this.props;
    const numOfQuestions = 4;
    if (currentQuestion >= numOfQuestions) {
      history.push('/feedback');
    } else {
      nextQuestionAction();
      this.setState({
        hasAnswered: false,
      });
    }
  }

  shufleAnswers(right, wrongs) {
    const max = 4;
    const random = Math.floor(Math.random() * max);
    wrongs.splice(random, 0, right);
    console.log(wrongs);
    return wrongs;
  }

  multipleQuestion() {
    const { questionsArr, currentQuestion } = this.props;
    const { hasAnswered } = this.state;
    const rightAnswer = (
      <button
        type="button"
        disabled={ hasAnswered }
        data-testid="correct-answer"
        key="right"
        onClick={ this.buttonClicked }
      >
        { questionsArr[currentQuestion].correct_answer }
      </button>);
    const wrongAnswer = questionsArr[currentQuestion].incorrect_answers
      .map((item, index) => (
        <button
          type="button"
          disabled={ hasAnswered }
          key={ `wrong-${index}` }
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.buttonClicked }
        >
          { item }
        </button>
      ));
    const shufledAnswer = this.shufleAnswers(rightAnswer, wrongAnswer);
    return (
      <div className="answers">
        { shufledAnswer }
      </div>
    );
  }

  bolleanQuestion() {
    const { questionsArr, currentQuestion } = this.props;
    const { hasAnswered } = this.state;
    if (questionsArr[currentQuestion].correct_answer) {
      return (
        <div className="answers">
          <button
            type="button"
            disabled={ hasAnswered }
            data-testid="correct-answer"
            onClick={ this.buttonClicked }
          >
            True
          </button>
          <button
            type="button"
            disabled={ hasAnswered }
            data-testid="wrong-answer-0"
            onClick={ this.buttonClicked }
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
          disabled={ hasAnswered }
          data-testid="wrong-answer-0"
          onClick={ this.buttonClicked }
        >
          True
        </button>
        <button
          type="button"
          disabled={ hasAnswered }
          data-testid="correct-answer"
          onClick={ this.buttonClicked }
        >
          False
        </button>
      </div>
    );
  }

  renderNextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima
      </button>
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
    const { hasAnswered } = this.state;
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
        {hasAnswered ? this.renderNextButton() : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.questions.questionsArr,
  currentQuestion: state.questions.currentQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestionAction: () => dispatch(nextQuestion()),
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Question));
