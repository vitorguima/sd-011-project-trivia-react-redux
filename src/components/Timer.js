import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.updateTimer = this.updateTimer.bind(this);
  }

  componentDidMount() {
    const SECOND = 1000;
    this.interval = setInterval(() => {
      const { restart } = this.props;
      if (restart) {
        this.setState((state) => ({
          seconds: state.seconds - 1,
        }));
      }
    },
    SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { scoreValue, stopTimer, stop } = this.props;
    if (prevState.seconds === 1) {
      scoreValue();
      this.updateTimer();
    }
    if (!prevProps.stop && stop) {
      this.updateTimer();
      stopTimer(prevState.seconds);
    }
  }

  updateTimer() {
    const SECOND = 30;
    this.setState({
      seconds: SECOND,
    });
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  scoreValue: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  stop: PropTypes.bool.isRequired,
  restart: PropTypes.bool.isRequired,
};

export default Timer;
