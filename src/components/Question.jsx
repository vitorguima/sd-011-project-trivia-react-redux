import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { array, count } = this.props;
    return (
      <p key={ array[count].question }>
        {array[count].question}
      </p>
    );
  }
}

export default Question;

Question.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  recivedGameData: PropTypes.func,
}).isRequired;
