import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/index.css';

export default class Timer extends Component {
  render() {
    const { sec } = this.props;
    return (
      <div className="timer">
        {`${sec}`}
      </div>
    );
  }
}

Timer.propTypes = {
  sec: PropTypes.number.isRequired,
};
