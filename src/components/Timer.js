import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  constructor() {
    super();

    this.state = {
      sec: 30,
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
    const { funcSetTime } = this.props;
    const ms = 1000;
    this.setState({
      setTime: setInterval(() => {
        this.setState((prev) => ({ sec: prev.sec - 1 }));
      }, ms) }, () => {
      const { setTime } = this.state;
      funcSetTime(setTime);
    });
  }

  render() {
    const { sec } = this.state;
    const { handleEnableButton } = this.props;
    handleEnableButton(sec);
    return (
      <div>
        {`00:${sec}`}
      </div>
    );
  }
}

Timer.propTypes = {
  handleEnableButton: PropTypes.func,
}.isRequired;
