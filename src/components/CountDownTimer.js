import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class CountdownTimer extends Component {
  constructor() {
    super();

    this.timer = this.timer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    // this.dispatchDisable();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  timer() {
    const { setSecondsToFinish } = this.props;
    const interval = 1000;
    this.myInterval = setInterval(() => {
      const { wasAnswered, secondsToFinish } = this.props;
      if (secondsToFinish > 0) {
        setSecondsToFinish(1);
        // this.setState((secs) => ({
        //   seconds: secs.seconds - 1,
        // }));
      }
      if (secondsToFinish <= 0) {
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
    const { setTimeScore, secondsToFinish } = this.props;
    const MAX_TIME = 30;
    const timeAnswered = MAX_TIME - secondsToFinish;
    setTimeScore(timeAnswered);
  }

  // dispatchDisable() {
  //   const { setSecondsToFinish, secondsToFinish } = this.props;
  //   if (secondsToFinish === 0) {
  //     setSecondsToFinish(seconds);
  //   }
  // }

  render() {
    const finalSeconds = 10;
    const { wasAnswered, secondsToFinish } = this.props;
    if (wasAnswered) {
      this.stopTimer();
    }
    if (secondsToFinish === 0) {
      return <h1>Tempo esgotado!</h1>;
    }
    return (
      <div>
        <h1>
          Tempo Restante: 00:
          { secondsToFinish < finalSeconds ? `0${secondsToFinish}` : secondsToFinish}
        </h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSecondsToFinish: (seconds) => dispatch(userActions.setSecondsToFinish(seconds)),
  setTimeScore: (seconds) => dispatch(userActions.setTimeScore(seconds)),
});

const mapStateToProps = (state) => ({
  wasAnswered: state.questionHandlers.wasAnswered,
  secondsToFinish: state.timeHandler.secondsToFinish,
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);

CountdownTimer.propTypes = {
  setSeconds: PropTypes.func,
}.isRequired;
