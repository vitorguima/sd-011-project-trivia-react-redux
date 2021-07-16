import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableButtonTrue } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: null,
    };
    this.initailTime = this.initailTime.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
  }

  componentDidMount() {
    this.initailTime();
  }

  componentDidUpdate() {
    this.decrementTime();
  }

  decrementTime() {
    const { time } = this.state;
    const interval = 1000;
    if (time > 0) {
      setTimeout(() => {
        this.setState({
          time: time - 1,
        });
      }, interval);
    } else {
      const { timeOut } = this.props;
      timeOut(true);
    }
  }

  initailTime() {
    this.setState({
      time: 30,
    });
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <p>{ time }</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeOut: (disabled) => dispatch(disableButtonTrue(disabled)),
});

export default connect(null, mapDispatchToProps)(Timer);

Timer.propTypes = {
  timeOut: PropTypes.func.isRequired,
};
