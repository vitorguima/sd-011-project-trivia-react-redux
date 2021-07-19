import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduceSecond } from '../actions';
import './Cronometer.css';

class Cronometer extends Component {
  constructor() {
    super();
    const ONE_SECOND = 1000;
    this.state = {
      timer: 30,
      startTimer: setInterval(() => this.reduceSecond(), ONE_SECOND),
    };

    this.reduceSecond = this.reduceSecond.bind(this);
  }

  componentDidUpdate() {
    const { startTimer } = this.state;
    const { stopTimer } = this.props;
    if (stopTimer) clearInterval(startTimer);
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

  render() {
    const { timer, stopTimer } = this.props;
    const NINE = 9;
    return (
      <div className="cronometerContainer">
        { stopTimer === false
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
  timer: state.timerReducer.timer,
  stopTimer: state.timerReducer.stopTimer,
});

const mapDispatchToProps = (dispatch) => ({
  actionReduceSecond: (timer) => dispatch(reduceSecond(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);
