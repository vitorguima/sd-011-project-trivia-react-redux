import React, { Component } from 'react';
import './Cronometer.css';

class Cronometer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      stopTimer: false,
    };

    this.startTimer = this.startTimer.bind(this);
    this.reduceSecond = this.reduceSecond.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const ONE_SECOND = 1000;
    setTimeout(() => {
      setInterval(() => this.reduceSecond(), ONE_SECOND);
    }, ONE_SECOND);
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
    return (
      <div className="cronometerContainer">
        { stopTimer === false
          ? <p className="timer">
            {' '}
            {`00:${timer}`}
            {' '}
            { /* eslint-disable-next-line react/jsx-closing-tag-location */ }
          </p>
          : <p className="timeout">
            Tempo Expirado
            { /* eslint-disable-next-line react/jsx-closing-tag-location */ }
          </p>}
      </div>
    );
  }
}

export default Cronometer;
