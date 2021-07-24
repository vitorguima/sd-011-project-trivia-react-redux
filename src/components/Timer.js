import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Timer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <div className="timer">
        <div className="contador">
          {`${timer}`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.triviaReducer.timer,
});

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Timer);
