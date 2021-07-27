import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetTimer, updateTimer } from '../actions';
import style from './Timer.module.css';

const interval = 1000;
const maxTime = 30;
const ten = 10;
const timeEnding = 5;

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      timerReference: null,
    };
  }

  componentDidMount() {
    this.timerControl();
  }

  componentDidUpdate() {
    const { timer, timerStopped } = this.props;
    const { timerReference } = this.state;

    if ((timer === 0 || timerStopped) && timerReference) {
      this.clearTimer();
    }

    if (timer === maxTime && !timerStopped && !timerReference) {
      this.timerControl();
    }
  }

  componentWillUnmount() {
    const { timerReference } = this.state;

    if (timerReference) this.clearTimer();
  }

  timerControl() {
    const {
      dispatchtUpdateTimer, dispatchResetTimer,
    } = this.props;

    const reference = setInterval(() => {
      dispatchtUpdateTimer();
    }, interval);

    dispatchResetTimer();

    this.setState({
      timerReference: reference,
    });
  }

  clearTimer() {
    const { toggleDisableButtons } = this.props;
    const { timerReference } = this.state;

    clearInterval(timerReference);

    toggleDisableButtons();

    this.setState({
      timerReference: null,
    });
  }

  render() {
    const { timer } = this.props;

    return (
      <span
        className={
          `
            ${style.timer}
            ${timer <= timeEnding && timer > 0 && style.shake}
            ${timer <= timeEnding && style.ending}
          `
        }
      >
        { `00 : ${timer < ten ? `0${timer}` : timer}` }
      </span>
    );
  }
}

const mapStateToProps = ({ timerReducer: { timer, timerReference, timerStopped } }) => ({
  timer,
  timerReference,
  timerStopped,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchtUpdateTimer: () => dispatch(updateTimer()),
  dispatchResetTimer: () => dispatch(resetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  toggleDisableButtons: PropTypes.func,
}.isRequired;
