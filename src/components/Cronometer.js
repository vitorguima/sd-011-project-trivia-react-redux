import React, { Component } from 'react';
import './Cronometer.css';

class Cronometer extends Component {
  constructor() {
    super();
    const ONE_SECOND = 1000;
    this.state = {
      timer: 30,
      stopTimer: false,
      startTimer: setInterval(() => this.reduceSecond(), ONE_SECOND),
    };

    this.reduceSecond = this.reduceSecond.bind(this);
  }

  componentDidUpdate() {
    const { startTimer, stopTimer } = this.state;
    if (stopTimer) clearInterval(startTimer);
  }

  reduceSecond() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.setState({ stopTimer: true });
    }
  }

  render() {
    const { timer, stopTimer } = this.state;
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

export default Cronometer;
