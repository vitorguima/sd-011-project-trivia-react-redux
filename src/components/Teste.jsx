import React, { Component } from 'react';

export default class Teste extends Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
    };
  }

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer() {
    const { counter } = this.state;
    const second = 1000;
    let timer = counter;

    const inteval = setInterval(() => {
      timer -= 1;
      if (timer <= 0) {
        clearInterval(inteval);
        this.handleWrongAnswer();
      }
      this.setState({ counter: timer });
    }, second);
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <p>{counter}</p>
      </div>
    );
  }
}
