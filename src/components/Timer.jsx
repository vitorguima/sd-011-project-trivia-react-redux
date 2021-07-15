import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
      delay: 1000,
      initial: 1000,
    };

    this.decrementCount = this.decrementCount.bind(this);
    this.startIn = this.startIn.bind(this);
  }

  componentDidMount() {
    const { initial } = this.state;
    setTimeout(this.startIn, initial);
  }

  startIn() {
    const { delay } = this.state;
    const interval = setInterval(this.decrementCount, delay);
    this.setState({ interval });
  }

  decrementCount() {
    const { count, interval } = this.state;
    const { onTimeout } = this.props;

    if (count - 1 <= 0) {
      onTimeout();
      clearInterval(interval);
    }

    this.setState({ count: count - 1 });
  }

  render() {
    const { count } = this.state;
    return <div>{count}</div>;
  }
}

Timer.propTypes = {
  onTimeout: PropTypes.func.isRequired,
};
