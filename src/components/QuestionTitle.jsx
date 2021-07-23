import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionTitle extends Component {
  render() {
    const { gameResults, counter } = this.props;
    return (
      <>
        <p>{counter}</p>
        <p data-testid="question-category" key={ gameResults.category }>
          {gameResults.category}
        </p>
        <h2 data-testid="question-text" key={ gameResults.question }>
          {gameResults.question}
        </h2>
      </>
    );
  }
}

QuestionTitle.propTypes = {
  gameResults: PropTypes.objectOf(PropTypes.object).isRequired,
  counter: PropTypes.number.isRequired,
};
