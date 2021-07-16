import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subTimer } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = { timer: 30 };
    this.timerFunc = this.timerFunc.bind(this);
  }

  componentDidMount() {
    this.timerFunc();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timerFunc() {
    const { timerDispatch } = this.props;
    const limit = 1000;
    this.timer = setInterval(() => timerDispatch(), limit);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <span>
          {timer}
        </span>
      </div>
    );
  }
}

mapStateToProps(state) ({
  timer: state.
});

const mapDispatchToProps = (dispatch) => ({
  timerDispatch: () => dispatch(subTimer()),
});

export default connect(null, mapDispatchToProps)(Timer);
