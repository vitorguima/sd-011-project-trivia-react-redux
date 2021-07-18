import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const SECOND = 1000;
    this.interval = setInterval(() => {
      this.setState((state) => ({
        seconds: state.seconds - 1,
      }));
    }, SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { funcao } = this.props;
    if (prevState.seconds === 1) {
      funcao();
      this.update();
    }
  }

  update() {
    clearInterval(this.interval);
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

Timer.propTypes = {
  funcao: PropTypes.func.isRequired,
};

export default Timer;
