import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestTime } from '../actions';

class ClockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
    this.timer = this.timer.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    setInterval(() => this.timer(), second);
  }

  componentDidUpdate() {
    const { buttonClick, rightAnswerClicked } = this.props;
    if (buttonClick) {
      clearInterval(1);
      const stopTime = document.querySelector('.timer');
      const question = document.querySelector('#question');
      const difficulty = question.getAttribute('difficulty');
      const score = rightAnswerClicked
        ? this.setScore(stopTime.innerHTML, difficulty)
        : 0;
      this.updateLocalStorage(score);
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
    const score = ten + (timer * questionLevel(difficulty));
    return score;
  }

  updateLocalStorage(score) {
    const player = JSON.parse(localStorage.getItem('state'));
    player.player.score = score;
    localStorage.setItem('state', JSON.stringify(player));
  }

  timer() {
    const { buttonClick } = this.props;
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }
    if (buttonClick) {
      this.setState({
        seconds: 30,
      });
    }
  }

  handleDisable() {
    const { seconds } = this.mapStateToProps.ClockComponent.seconds;
    if (seconds !== 0) {
      this.setState.disableButton = false;
    } else {
      this.setState.disableButton = true;
    }
  }

  render() {
    const { seconds } = this.state;
    const { buttonClick, nextQuestion, times, clock } = this.props;
    const notAnswered = () => {
      if (seconds === 0) {
        return (
          <div>
            <button type="button" onClick={ nextQuestion } data-testid="btn-next">
              Próxima
            </button>
          </div>
        );
      }
    };
    return (
      <div>
        <div>
          <p className="timer">{times(clock).state}</p>
        </div>
        <div>
          {buttonClick && (
            <button type="button" onClick={ nextQuestion } data-testid="btn-next">
              Próxima
            </button>
          )}
          {notAnswered()}
        </div>
      </div>
    );
  }
}

ClockComponent.propTypes = {
  times: PropTypes.func.isRequired,
  clock: PropTypes.number.isRequired,
  buttonClick: PropTypes.bool.isRequired,
  rightAnswerClicked: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buttonClick: state.trivia.buttonClick,
  rightAnswerClicked: state.trivia.rightAnswerClicked,
  questions: state.trivia.questions,
  buttonDisable: state.trivia.buttonDisable,
  clock: state.trivia.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  times: (state) => dispatch(requestTime(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClockComponent);
