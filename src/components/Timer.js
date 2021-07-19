import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      timer: null,
    };
  }

  componentDidMount() {
    this.handleState();
  }

  componentDidUpdate() {
    const { secondsFunc } = this.props;
    const { timer, seconds } = this.state;
    if (seconds <= 0) {
      clearInterval(timer);
    }
    secondsFunc(seconds);
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  handleState() {
    const { timerFunc } = this.props;
    const ms = 1000;
    this.setState({
      timer: setInterval(() => {
        this.setState((prev) => ({ seconds: prev.seconds - 1 }));
      }, ms) }, () => {
      const { timer } = this.state;
      timerFunc(timer);
    });
  }

  render() {
    const { seconds } = this.state;
    const decimalSec = 10;
    return (
      <div>
        { seconds >= decimalSec ? `00:${seconds}` : `00:0${seconds}` }
      </div>
    );
  }
}

export default Timer;

Timer.propTypes = {
  secondsFunc: PropTypes.func,
  timerFunc: PropTypes.func,
}.isRequired;
