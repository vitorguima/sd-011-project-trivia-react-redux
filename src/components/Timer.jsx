import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
    this.handleTimer = this.handleTimer.bind(this);
  }

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer() {
    const NUMBER_SECONDS = 1000;
    let timer = 30;
    const interval = setInterval(() => {
      timer -= 1;
      console.log(timer);
    }, NUMBER_SECONDS);
    this.setState({
      timer,
    });
    if (timer === 0) clearInterval(interval);
  }

  render() {
    const { timer } = this.state;
    return (
      <p>{timer}</p>
    );
  }
}

export default Timer;
