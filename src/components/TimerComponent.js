import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerButton, nextQuestionCount, addQuestion, clickButton } from '../actions';

class TimerComponent extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      count: 0,
    };
    this.timer = this.timer.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.buttonNextQuestion = this.buttonNextQuestion.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
    this.newScore = this.newScore.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    this.interval = setInterval(() => this.timer(), second);
  }

  componentDidUpdate() {
    const { buttonClick, updateNumQuestion } = this.props;
    const { count } = this.state;
    updateNumQuestion(count);
    if (buttonClick) {
      clearInterval(this.interval);
      this.newScore();
    }
  }

  setScore(timer, difficulty) {
    const ten = 10;
    const questionLevel = (dif) => {
      const one = 1;
      const two = 2;
      const three = 3;
      switch (dif) {
      case 'easy':
        return one;
      case 'medium':
        return two;
      case 'hard':
        return three;
      default:
        break;
      }
    };
    // const score = 10 + (timer * questionLevel(obj1));
    return ten + (timer * questionLevel(difficulty));
  }

  updateLocalStorage(score) {
    const player = JSON.parse(localStorage.getItem('state'));
    player.player.score += score;
    localStorage.setItem('state', JSON.stringify(player));
  }

  timer() {
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }
      ));
    }
    if (seconds === 0) {
      const { updateButton } = this.props;
      updateButton();
    }
  }

  newQuestion() {
    const { nextQuestion } = this.props;
    const { count } = this.state;
    nextQuestion(count);
  }

  newScore() {
    const { rightBtnClicked } = this.props;
    const stopTime = document.querySelector('.timer');
    const question = document.querySelector('#question');
    const difficulty = question.getAttribute('difficulty');
    const score = rightBtnClicked
      ? this.setScore(stopTime.innerHTML, difficulty)
      : 0;
    this.updateLocalStorage(score);
  }

  buttonNextQuestion() {
    const maxQuestions = 4;
    const { count } = this.state;
    const { finishQuestions, updateClickButton } = this.props;
    const resetButton = {
      buttonClick: false,
      rightBtnClicked: false,
    };
    if (count < maxQuestions) {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    } else {
      finishQuestions();
    }
    updateClickButton(resetButton);
  }

  render() {
    const { seconds } = this.state;
    const { buttonClick } = this.props;
    this.newQuestion();
    return (
      <div>
        <div>
          <p className="timer">{ seconds }</p>
        </div>
        <div>
          { buttonClick
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.buttonNextQuestion }
              >
                Próxima
              </button>)}
        </div>
      </div>
    );
  }
}

TimerComponent.propTypes = {
  updateButton: PropTypes.func.isRequired,
  buttonClick: PropTypes.bool.isRequired,
  rightBtnClicked: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  finishQuestions: PropTypes.func.isRequired,
  updateNumQuestion: PropTypes.func.isRequired,
  updateClickButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buttonClick: state.triviaReducer.buttonClick,
  rightBtnClicked: state.triviaReducer.rightBtnClicked,
});

const mapDispatchToProps = (dispatch) => ({
  updateButton: (state) => dispatch(timerButton(state)),
  nextQuestion: (state) => dispatch(nextQuestionCount(state)),
  updateNumQuestion: (state) => dispatch(addQuestion(state)),
  updateClickButton: (state) => dispatch(clickButton(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerComponent);
