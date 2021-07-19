import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerButton } from '../actions';

class ClockComponent extends Component {
  constructor() {
    super();
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
    return ten + timer * questionLevel(difficulty);
  }

  updateLocalStorage(score) {
    const player = JSON.parse(localStorage.getItem('state'));
    player.player.score = score;
    localStorage.setItem('state', JSON.stringify(player));
  }

  timer() {
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }
  }

  render() {
    const { seconds } = this.state;
    const { buttonClick, nextQuestion } = this.props;
    return (
      <div>
        <div>
          <p className="timer">{seconds}</p>
        </div>
        <div>
          {buttonClick && (
            <button type="button" onClick={ nextQuestion } data-testid="btn-next">
              Próxima
            </button>
          )}
        </div>
      </div>
    );
  }
}

ClockComponent.propTypes = {
  buttonClick: PropTypes.bool.isRequired,
  rightAnswerClicked: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buttonClick: state.trivia.buttonClick,
  rightAnswerClicked: state.trivia.rightAnswerClicked,
});

const mapDispatchToProps = (dispatch) => ({
  updateButton: (state) => dispatch(timerButton(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClockComponent);
