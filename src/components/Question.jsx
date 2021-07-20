import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeToNextQuestion, startCountdown, showNextBtn } from '../actions';
import QuestionHeader from './QuestionHeader';
import BooleanQuestion from './BooleanQuestion';
import MultipleChoice from './MultipleChoice';
import Loading from './Loading';

const INTERVAL = 1000;
class Question extends React.Component {
  componentDidMount() {
    const { userName, userEmail } = this.props;
    const state = {
      player: {
        name: userName,
        assertions: 0,
        score: 0,
        gravatarEmail: userEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
    this.startCounter();
  }

  componentDidUpdate() {
    const { timer, showBtn, showNextButton } = this.props;

    if (timer === 0 || showBtn) {
      this.stopCountDown();
      showNextButton();
    }
  }

  localStoragePlayerInfo(timer, difficulty) {
    const state = JSON.parse(localStorage.getItem('state'));

    const startScore = 10;
    const difficultyLevel = { hard: 3, medium: 2, easy: 1 };
    if (difficulty === 'hard') {
      state.player.score += startScore + (difficultyLevel.hard * timer);
      state.player.assertions += 1;
    }
    if (difficulty === 'medium') {
      state.player.score += startScore + (difficultyLevel.medium * timer);
      state.player.assertions += 1;
    }
    if (difficulty === 'easy') {
      state.player.score += startScore + (difficultyLevel.easy * timer);
      state.player.assertions += 1;
    }

    localStorage.setItem('state', JSON.stringify(state));
  }

  startCounter() {
    const { startCounter } = this.props;
    this.interval = setInterval(
      () => startCounter(),
      INTERVAL,
    );
  }

  stopCountDown() {
    clearInterval(this.interval);
  }

  render() {
    const { questions, showBtn, currentQuestion, nextQuestion, push } = this.props;
    const maxQuestions = 4;
    return (
      <section>
        {(questions[currentQuestion])
          ? (
            <>
              <QuestionHeader question={ questions[currentQuestion] } />
              <div className="answer-options">
                {(questions[currentQuestion].type === 'boolean')
                  ? (
                    <BooleanQuestion
                      disabled={ showBtn }
                      question={ questions[currentQuestion] }
                      localStoragePlayerInfo={ this.localStoragePlayerInfo }
                    />
                  )
                  : (
                    <MultipleChoice
                      disabled={ showBtn }
                      question={ questions[currentQuestion] }
                      localStoragePlayerInfo={ this.localStoragePlayerInfo }
                    />
                  )}
              </div>
              <button
                data-testid="btn-next"
                type="button"
                className={ (showBtn) ? 'show-btn' : 'hide-btn' }
                onClick={ () => {
                  if (currentQuestion === maxQuestions) {
                    push('/feedback');
                  } else {
                    this.startCounter();
                    nextQuestion();
                  }
                } }
              >
                Próxima pergunta
              </button>
            </>
          )
          : <Loading />}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.results,
  showBtn: state.questionsReducer.showBtn,
  currentQuestion: state.questionsReducer.currentQuestion,
  timer: state.countDownReducer.timer,
  userName: state.loginReducer.name,
  userEmail: state.loginReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(changeToNextQuestion()),
  startCounter: () => dispatch(startCountdown()),
  showNextButton: () => dispatch(showNextBtn()),
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  showBtn: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  startCounter: PropTypes.func.isRequired,
  showNextButton: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
};

Question.defaultProps = {
  questions: [{}],
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
