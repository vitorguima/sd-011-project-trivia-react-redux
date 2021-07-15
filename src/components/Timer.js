import React, { Component } from 'react';

export default class componentName extends Component {
  constructor() {
    super();

    this.state = {
      sec: 5,
      setTime: null,
    };
    this.Timer = this.Timer.bind(this);
  }

  componentDidMount() {
    this.Timer();
  }

  componentDidUpdate() {
    const { setTime, sec } = this.state;
    if (sec <= 0) {
      clearInterval(setTime);
    }
  }

  componentWillUnmount() {
    const { setTime } = this.state;
    clearInterval(setTime);
  }

  Timer() {
    const ms = 1000;
    this.setState({
      setTime: setInterval(() => {
        this.setState((prev) => ({ sec: prev.sec - 1 }));
      }, ms) });
  }

  render() {
    const { sec } = this.state;
    return (
      <div>
        {`00:${sec}`}
      </div>
    );
  }
}
