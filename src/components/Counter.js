import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAnswersButtons, updateScore } from '../actions/game';
import { startCounter, stopCounter, saveCounter } from '../actions/counter';
import scoreCalculator from '../helpers/scoreCalculator';

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      currentCount: 30,
    };
    this.handleCount = this.handleCount.bind(this);
  }

  componentDidMount() {
    const { startingCounter } = this.props;
    startingCounter();
    this.counter();
  }


  // alterar counter
  handleCount() {
    const { currentCount } = this.state;
    const { handleButton } = this.props;
    return currentCount !== 0 ? this.setState((prevState) => ({
      currentCount: prevState.currentCount - 1,
    })) : handleButton(true);
  }

  counter() {
    const { stoppingCounter, saveCounterTime, handleButton } = this.props;
    const timeInterval = 1000;
    handleButton(false);
    const questionInterval = setInterval(() => {
      const { counterStatus } = this.props;
      const { currentCount } = this.state;
      if (!counterStatus) {
        clearInterval(questionInterval);
        saveCounterTime(currentCount);
        const { questionDifficulty, currentScore, score } = this.props;
        scoreCalculator(currentCount, questionDifficulty, currentScore, score);
      }
      if (counterStatus) {
        this.handleCount();
      }
      if (currentCount === 0) {
        stoppingCounter();
        clearInterval(questionInterval);
        saveCounterTime(currentCount);
        const { questionDifficulty, currentScore, score } = this.props;
        scoreCalculator(currentCount, questionDifficulty, currentScore, score);
      }
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

const mapStateToProps = (state) => ({
  currentCounter: state.counter.counter,
  counterStatus: state.counter.counterStatus,
  counterTime: state.counter.counterPoints,
  questionDifficulty: state.game.difficulty,
  currentScore: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  handleButton: (bool) => dispatch(handleAnswersButtons(bool)),
  startingCounter: () => dispatch(startCounter()),
  stoppingCounter: () => dispatch(stopCounter()),
  saveCounterTime: (time) => dispatch(saveCounter(time)),
  score: (questionScore) => dispatch(updateScore(questionScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

Counter.propTypes = {
  handleButton: PropTypes.func.isRequired,
  counterStatus: PropTypes.bool.isRequired,
};
