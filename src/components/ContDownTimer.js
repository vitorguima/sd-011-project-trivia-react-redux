import React, { Component } from 'react';

export default class CountdownTimer extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 30,
      // disabled: true,
    };
  }

  componentDidMount() {
    const interval = 1000;
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState(({ secs }) => ({
          seconds: secs - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(this.myInterval);
        // this.setState({
        //   disabled: false,
        // });
      }
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    const finalSeconds = 10;
    return (
      <div>
        { minutes === 0 && seconds === 0
          ? <h1>Tempo esgotado!</h1>
          : <h1>
            Time Remaining:
            {minutes}
            :
            {seconds < finalSeconds ? `0${seconds}` : seconds}
          </h1> }
      </div>
    );
  }
}
