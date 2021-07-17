import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Timer extends Component {
  // constructor(prop) {
  //   super(prop);
  // this.timerFunc = this.timerFunc.bind(this);
  // }

  // componentDidMount() {
  //   this.timerFunc();
  // }

  // componentDidUpdate() {
  //   const { timer } = this.props;
  //   if (timer <= 0) {
  //     clearInterval(this.setTimer);
  //   }
  // }

  // componentWillUnmount() {
  //   clearInterval(this.setTimer);
  // }

  // timerFunc() {
  //   const { timerDispatch } = this.props;
  //   const limit = 1000;
  //   this.setTimer = setInterval(() => timerDispatch(), limit);
  // }

  render() {
    const { timer } = this.props;
    return (
      <div>
        <span>
          {timer}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.triviaReducer.timer,
});

// const mapDispatchToProps = (dispatch) => ({
//   timerDispatch: () => dispatch(subTimer()),
// });

Timer.propTypes = {
  // timerDispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Timer);
