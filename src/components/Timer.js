import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      count: 30,
      delay: 1000,
      initial: 5000,
    };

    this.decrementCount = this.decrementCount.bind(this);
    this.startIn = this.startIn.bind(this);
  }

  componentDidMount() {
    const { initial } = this.state;
    setTimeout(this.startIn, initial);
  }

  decrementCount() {
    const { count, interval } = this.state;
    const { handleTimer } = this.props;

    if (count - 1 <= 0) {
      handleTimer();
      clearInterval(interval);
    }

    this.setState({ count: count - 1 });
  }

  startIn() {
    const { delay } = this.state;
    const interval = setInterval(this.decrementCount, delay);
    this.setState({ interval });
  }

  render() {
    const { count } = this.state;
    return <div>{count}</div>;
  }
}

Timer.propTypes = {
  handleTimer: PropTypes.func.isRequired,
};

// Use esse componente dessa maneira
// <Timer handleTimer={ func } />

// const mapStateToProps = (state) => ({
//   score: state.player.score,
// });

// const mapDispatchToProps = (dispatch) => ({
//   func: () => dispatch(action()),
// });

export default Timer; // connect(mapStateToProps, mapDispatchToProps)(Timer);
