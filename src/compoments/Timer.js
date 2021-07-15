import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = { timer: 30 };
    this.timerFunc = this.timerFunc.bind(this);
  }

  // setTimeout - Desabilita botoes
  // setInterval -
  componentDidMount() {
    this.timerFunc();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timerFunc() {
    const limit = 1000;
    this.timer = setInterval(() => this.setState((prev) => ({
      timer: prev.timer - 1,
    })), limit);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <span>
          {timer}
        </span>
      </div>
    );
  }
}
