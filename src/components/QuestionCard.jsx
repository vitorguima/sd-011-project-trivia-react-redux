import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';
import BooleanAnswers from './BooleanAnswers';
import MultipleAnswers from './MultipleAnswers';
import Timer from './Timer';
import { nextQuestion, resetTimer, stopTimer, updateScore } from '../actions';

const baseScore = 10;

class QuestionCard extends React.Component {
  constructor() {
    super();

    this.state = {
      disableButtons: false,
      nexButtonVisible: false,
    };

    this.toggleDisableButtons = this.toggleDisableButtons.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
  }

  setScore() {
    const { question, timer, dispatchUpdateScore } = this.props;

    const difficultyScore = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const stateObj = JSON.parse(localStorage.getItem('state'));

    stateObj.player.score += baseScore + (timer * difficultyScore[question.difficulty]);
    stateObj.player.assertions += 1;

    localStorage.setItem('state', JSON.stringify(stateObj));

    dispatchUpdateScore(stateObj.player.score);
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
      questions, question, history, gravatar } = this.props;

    if (questions.indexOf(question) === questions.length - 1) {
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      const { player } = JSON.parse(localStorage.getItem('state'));

      ranking.push({
        name: player.name,
        score: player.score,
        picture: gravatar,
      });

      ranking.sort((first, second) => second.score - first.score);

      localStorage.setItem('ranking', JSON.stringify(ranking));

      history.push('/feedback');
    } else {
      dispatchNextQuestion();

      this.toggleDisableButtons();
      this.resetColor();
      this.toggleNextButtonVisibility();
    }

    dispatchResetTimer();
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

  handleQuestionAnswered(event) {
    const { dispatchStopTimer } = this.props;

    this.changeColor(event);
    this.toggleNextButtonVisibility();
    if (event.target.dataset.testid === 'correct-answer') this.setScore();

    dispatchStopTimer();
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
                handleQuestionAnswered={ this.handleQuestionAnswered }
                disabled={ disableButtons }
              />
            )
            : (
              <MultipleAnswers
                handleQuestionAnswered={ this.handleQuestionAnswered }
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
  {
    gameReducer: { questions, question, isLoading, error },
    playerReducer: { gravatar },
    timerReducer: { timer },
  },
) => ({
  questions,
  question,
  isLoading,
  error,
  gravatar,
  timer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
  dispatchResetTimer: () => dispatch(resetTimer()),
  dispatchUpdateScore: (score) => dispatch(updateScore(score)),
  dispatchStopTimer: () => dispatch(stopTimer()),
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
