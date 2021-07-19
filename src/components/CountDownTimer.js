import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class CountdownTimer extends Component {
  constructor() {
    super();

    this.timer = this.timer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.state = {
      minutes: 0,
      seconds: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    this.dispatchDisable();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  timer() {
    const interval = 1000;
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      const { wasAnswered } = this.props;
      if (seconds > 0) {
        this.setState((secs) => ({
          seconds: secs.seconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(this.myInterval);
        // this.setState({
        //   disabled: false,
        // });
      }
      if (wasAnswered) {
        clearInterval(this.myInterval);
      }
    }, interval);
  }

  stopTimer() {
    console.log('chamei');
    const { setTimeScore } = this.props;
    const { seconds } = this.state;
    const MAX_TIME = 30;
    const timeAnswered = MAX_TIME - seconds;
    setTimeScore(timeAnswered);
  }

  dispatchDisable() {
    const { setSeconds } = this.props;
    const { seconds } = this.state;
    if (seconds === 0) {
      setSeconds(seconds);
    }
  }

  render() {
    const { minutes, seconds } = this.state;
    const { wasAnswered } = this.props;
    const finalSeconds = 10;
    if (wasAnswered) {
      this.stopTimer();
    }
    if (minutes === 0 && seconds === 0) {
      return <h1>Tempo esgotado!</h1>;
    }
    return (
      <div>
        <h1>
          Time Remaining:
          {minutes}
          :
          {seconds < finalSeconds ? `0${seconds}` : seconds}
        </h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSeconds: (seconds) => dispatch(userActions.getSeconds(seconds)),
  setTimeScore: (seconds) => dispatch(userActions.setTimeScore(seconds)),
});

const mapStateToProps = (state) => ({
  wasAnswered: state.questionHandlers.wasAnswered,
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);

CountdownTimer.propTypes = {
  setSeconds: PropTypes.func,
}.isRequired;
