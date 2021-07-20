import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduceSecond } from '../actions';
import './Cronometer.css';

class Cronometer extends Component {
  constructor() {
    super();
    const ONE_SECOND = 1000;
    this.state = {
      timer: 30,
      currentQuestionIndex: 0,
      startTimer: setInterval(() => this.reduceSecond(), ONE_SECOND),
    };

    this.reduceSecond = this.reduceSecond.bind(this);
    this.resetTimerCountdown = this.resetTimerCountdown.bind(this);
  }

  componentDidUpdate() {
    const { startTimer, currentQuestionIndex } = this.state;
    const { stopTimer, questionIndex } = this.props;
    if (stopTimer) clearInterval(startTimer);
    if (currentQuestionIndex !== questionIndex) {
      this.resetTimerCountdown();
    }
  }

  reduceSecond() {
    const { timer } = this.state;
    const { actionReduceSecond } = this.props;

    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }

    return actionReduceSecond(timer);
  }

  resetTimerCountdown() {
    const { questionIndex } = this.props;
    const ONE_SECOND = 1000;
    this.setState({
      timer: 30,
      currentQuestionIndex: questionIndex,
      startTimer: setInterval(() => this.reduceSecond(), ONE_SECOND),
    });
  }

  render() {
    const { timer } = this.props;
    const NINE = 9;
    return (
      <div className="cronometerContainer">
        { timer > 0
          ? (
            <p className="timer">
              { timer > NINE ? `00:${timer}` : `00:0${timer}`}
            </p>
          )
          : (
            <p className="timeout">
              Tempo Expirado
            </p>
          ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.cronometer.timer,
  stopTimer: state.cronometer.stopTimer,
});

const mapDispatchToProps = (dispatch) => ({
  actionReduceSecond: (timer) => dispatch(reduceSecond(timer)),
});

Cronometer.propTypes = {
  stopTimer: PropTypes.bool.isRequired,
  actionReduceSecond: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);
