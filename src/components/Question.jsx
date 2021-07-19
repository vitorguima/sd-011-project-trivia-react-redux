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
    this.startCounter();
  }

  componentDidUpdate() {
    const { timer, showBtn, showNextButton } = this.props;

    if (timer === 0 || showBtn) {
      this.stopCountDown();
      showNextButton();
    }
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
    const { questions, showBtn, currentQuestion, nextQuestion } = this.props;
    return (
      <section>
        {(questions[currentQuestion])
          ? (
            <>
              <QuestionHeader question={ questions[currentQuestion] } />
              <div className="answer-options">
                { (questions[currentQuestion].type === 'boolean')
                  ? (
                    <BooleanQuestion
                      disabled={ showBtn }
                      question={ questions[currentQuestion] }
                    />
                  )
                  : (
                    <MultipleChoice
                      disabled={ showBtn }
                      question={ questions[currentQuestion] }
                    />
                  )}
              </div>
              <button
                data-testid="btn-next"
                type="button"
                className={ (showBtn) ? 'show-btn' : 'hide-btn' }
                onClick={ () => {
                  this.startCounter();
                  nextQuestion();
                } }
              >
                Próxima pergunta
              </button>
            </>
          )
          : <Loading /> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.results,
  showBtn: state.questionsReducer.showBtn,
  currentQuestion: state.questionsReducer.currentQuestion,
  timer: state.countDownReducer.timer,
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
};

Question.defaultProps = {
  questions: [{}],
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
