import React, { Component } from 'react'

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      counter: 5,
      disabled: false,
    }
  }

  componentDidUpdate() {
    const { counter } = this.state;
    let count = setTimeout(() => {
      this.setState({ counter: counter - 1})
      return count;
    }, 1000);
    if (counter === 0) {
      clearInterval(count);
    }
    return () => clearInterval(count);
  }

  disabledButton() {
    
  }

  render() {
    const { counter, disabled } = this.state;
    return (
      <div>
        { counter }
      </div>
    )
  }
}

export default Timer;
