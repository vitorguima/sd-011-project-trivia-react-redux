import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../actions';

class CountdownTimer extends Component {
  constructor() {
    super();

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  timer() {
    const { setSecondsToFinish } = this.props;
    const interval = 1000;
    this.myInterval = setInterval(() => {
      const { wasAnswered, secondsToFinish } = this.props;
      if (secondsToFinish > 1 || !wasAnswered) {
        setSecondsToFinish();
      }
      if (secondsToFinish <= 1) {
        clearInterval(this.myInterval);
      }
      if (wasAnswered) {
        clearInterval(this.myInterval);
      }
    }, interval);
  }

  render() {
    const finalSeconds = 10;
    const { secondsToFinish } = this.props;
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
  questionIndex: state.questionHandlers.questionIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);

CountdownTimer.propTypes = {
  setSeconds: PropTypes.func,
}.isRequired;
