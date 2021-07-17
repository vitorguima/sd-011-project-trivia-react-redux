import React from 'react';
import PropTypes from 'prop-types';

class WrongAnswer extends React.Component {
  render() {
    const { array } = this.props;
    // const array = gameData.results;
    return (
      <div>
        {
          array && array.map((value, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              key={ index }
            >
              {value}
            </button>
          ))
        }
      </div>
    );
  }
}

export default WrongAnswer;

WrongAnswer.defaultProps = {
  gameData: {},
};

WrongAnswer.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  recivedGameData: PropTypes.func,
}).isRequired;
