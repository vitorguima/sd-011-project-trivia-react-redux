import PropTypes from 'prop-types';
import React, { Component } from 'react';

const DELAY = 1000;
class Timer extends Component {
  constructor() {
    super();

    this.state = {
      count: 30,
    };

    this.decrementCount = this.decrementCount.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.decrementCount, DELAY);
  }

  decrementCount() {
    const { count } = this.state;
    const { handleClickAndTimeOut } = this.props;

    if (count - 1 <= 0) {
      handleClickAndTimeOut();
      clearInterval(this.intervalId);
    }

    this.setState({ count: count - 1 });
  }

  render() {
    const { count } = this.state;
    return <div>{count}</div>;
  }
}

Timer.propTypes = {
  handleClickAndTimeOut: PropTypes.func.isRequired,
};

export default Timer;
