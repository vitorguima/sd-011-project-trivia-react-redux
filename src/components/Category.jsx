import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { array, count } = this.props;
    return (
      <p data-testid="question-category">
        {array[count].category}
      </p>
    );
  }
}

export default Category;

Category.propTypes = ({
  gameData: PropTypes.objectOf(PropTypes.object),
  recivedGameData: PropTypes.func,
}).isRequired;
