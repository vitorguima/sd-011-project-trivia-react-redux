import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAnswersButtons } from '../actions/game';

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      currentCount: 5,
    };
    this.handleCount = this.handleCount.bind(this);
  }

  componentDidMount() {
    this.counter();
  }

  handleCount() {
    const { currentCount } = this.state;
    const { handleButton } = this.props;
    return currentCount !== 0 ? this.setState((prevState) => ({
      currentCount: prevState.currentCount - 1,
    })) : handleButton(true);
  }

  counter() {
    const timeInterval = 1000;
    const { handleButton } = this.props;
    handleButton(false);
    const questionInterval = setInterval(() => {
      const { currentCount } = this.state;
      if (currentCount === 0) {
        clearInterval(questionInterval);
      }
      this.handleCount();
    }, timeInterval);
  }

  render() {
    const { currentCount } = this.state;
    return (
      <h1>
        { currentCount }
      </h1>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleButton: (bool) => dispatch(handleAnswersButtons(bool)),
});

export default connect(null, mapDispatchToProps)(Counter);

Counter.propTypes = {
  handleButton: PropTypes.func.isRequired,
};
