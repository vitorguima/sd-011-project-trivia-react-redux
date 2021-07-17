import React from 'react';
import PropTypes from 'prop-types';

class CorrectAnswer extends React.Component {
  render() {
    const { array, count } = this.props;
    return (
      <button
        type="button"
        key={ array[count].correct_answer }
      >
        {array[count].correct_answer}
      </button>
    );
  }
}

export default CorrectAnswer;

CorrectAnswer.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  recivedGameData: PropTypes.func,
}).isRequired;
