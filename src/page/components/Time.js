import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Time extends Component {
  constructor() {
    super();
    this.state = {
      initialTime: 3,
      setTime: null,
    };
    this.timeQuestion = this.timeQuestion.bind(this);
  }

  componentDidMount() {
    this.timeQuestion();
  }

  componentDidUpdate() {
    const { setTime, initialTime } = this.state;
    if (initialTime <= 0) {
      clearInterval(setTime);
    }
  }

  componentWillUnmount() {
    const { setTime } = this.state;
    clearInterval(setTime);
  }

  timeQuestion() {
    const { funcSetTime } = this.props;
    const mil = 1000;
    this.setState({
      setTime: setInterval(() => {
        this.setState((prev) => ({ initialTime: prev.initialTime - 1 }));
      }, mil) }, () => {
      const { setTime } = this.state;
      funcSetTime(setTime);
    });
  }

  render() {
    const { initialTime } = this.state;
    return (
      <div>
        { initialTime }
      </div>
    );
  }
}

Time.propTypes = {
  funcSetTime: PropTypes.func.isRequired,
};
