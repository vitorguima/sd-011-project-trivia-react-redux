import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Timer extends Component {
  render() {
    const { sec } = this.props;
    return (
      <div>
        {`00:${sec}`}
      </div>
    );
  }
}

Timer.propTypes = {
  sec: PropTypes.number.isRequired,
};
