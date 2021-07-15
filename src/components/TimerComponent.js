import React, { Component } from 'react';

class TimerComponent extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    setInterval(() => this.timer(), second);
  }

  timer() {
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }
      ));
    }
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

export default TimerComponent;
