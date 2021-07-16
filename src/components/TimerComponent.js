import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerButton } from '../actions';

class TimerComponent extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    setInterval(() => this.timer(), second);
  }

  timer() {
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }
      ));
    }

    if (seconds === 0) {
      const { updateButton } = this.props;
      updateButton();
    }
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

TimerComponent.propTypes = {
  updateButton: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateButton: (state) => dispatch(timerButton(state)),
});

export default connect(null, mapDispatchToProps)(TimerComponent);
