import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';
import BooleanAnswers from './BooleanAnswers';
import MultipleAnswers from './MultipleAnswers';
import Timer from './Timer';
import { nextQuestion, resetTimer } from '../actions';

const baseScore = 10;

class QuestionCard extends React.Component {
  constructor() {
    super();

    this.state = {
      disableButtons: false,
      nexButtonVisible: false,
    };

    this.toggleDisableButtons = this.toggleDisableButtons.bind(this);
    this.setScore = this.setScore.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.toggleNextButtonVisibility = this.toggleNextButtonVisibility.bind(this);
  }

  setScore() {
    const { question, timer } = this.props;

    const difficultyScore = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const stateObj = JSON.parse(localStorage.getItem('state'));

    stateObj.player.score += baseScore + (timer * difficultyScore[question.difficulty]);
    stateObj.player.assertions += 1;

    localStorage.setItem('state', JSON.stringify(stateObj));
  }

  toggleDisableButtons() {
    this.setState((previousState) => ({
      disableButtons: !previousState.disableButtons,
    }));
  }

  resetColor() {
    const buttons = document.querySelectorAll('button[data-testid*="answer"]');
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].classList.remove(...buttons[index].classList);
    }
  }

  handleNextQuestion() {
    const { dispatchNextQuestion, dispatchResetTimer,
      questions, question, history } = this.props;

    if (questions.indexOf(question) === questions.length - 1) {
      history.push('/feedback');
    } else {
      dispatchNextQuestion();
      dispatchResetTimer();

      this.resetColor();
      this.toggleNextButtonVisibility();
    }
  }

  changeColor({ target }) {
    const getButtons = target.parentElement.children;

    for (let index = 0; index < getButtons.length; index += 1) {
      if (getButtons[index].dataset.testid === 'correct-answer') {
        getButtons[index].classList.add('correct');
      } else {
        getButtons[index].classList.add('incorrect');
      }
    }
  }

  toggleNextButtonVisibility() {
    this.setState((previousState) => ({
      nexButtonVisible: !previousState.nexButtonVisible,
    }));
  }

  renderAnswers() {
    const { question } = this.props;
    const { disableButtons } = this.state;

    return (
      <section>
        {
          question.type === 'boolean'
            ? (
              <BooleanAnswers
                changeColor={ this.changeColor }
                toggleNextButtonVisibility={ this.toggleNextButtonVisibility }
                setScore={ this.setScore }
                disabled={ disableButtons }
              />
            )
            : (
              <MultipleAnswers
                changeColor={ this.changeColor }
                toggleNextButtonVisibility={ this.toggleNextButtonVisibility }
                setScore={ this.setScore }
                disabled={ disableButtons }
              />
            )
        }
      </section>
    );
  }

  render() {
    const { question, isLoading, error } = this.props;
    const { nexButtonVisible } = this.state;

    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    return (
      <section>
        <section>
          <p
            data-testid="question-category"
          >
            { question.category }
          </p>
          <p
            data-testid="question-text"
          >
            { question.question }
          </p>
        </section>
        { this.renderAnswers() }
        <Timer toggleDisableButtons={ this.toggleDisableButtons } />
        <button
          type="button"
          onClick={ this.handleNextQuestion }
          hidden={ !nexButtonVisible }
          data-testid="btn-next"
        >
          Próxima
        </button>
      </section>
    );
  }
}

const mapStateToProps = (
  { gameReducer: { questions, question, timer, isLoading, error } },
) => ({
  questions,
  question,
  timer,
  isLoading,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
  dispatchResetTimer: () => dispatch(resetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);

QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answer: PropTypes.arrayOf(PropTypes.string),
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}.isRequired;
