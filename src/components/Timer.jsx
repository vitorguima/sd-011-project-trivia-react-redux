import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
    this.coundDown30Seconds = this.coundDown30Seconds.bind(this);
  }

  componentDidMount() {
    this.coundDown30Seconds();
  }

  coundDown30Seconds() {
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState({
        seconds: seconds - 1,
      });
      setTimeout(this.coundDown30Seconds, 1000);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{seconds}</p>
      </div>
    );
  }
}
