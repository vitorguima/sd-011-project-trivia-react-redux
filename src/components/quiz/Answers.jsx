import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  render() {
    const { questionsList, isDisabled, handleButtons } = this.props;
    return (
      <ul>
        <li>
          <button
            disabled={ isDisabled }
            data-testid="correct-answer"
            className="correct-answer"
            type="button"
            onClick={ () => handleButtons(true) }
          >
            { questionsList.correct_answer }
          </button>
          { questionsList.incorrect_answers.map((wrong, index) => (
            <button
              disabled={ isDisabled }
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              type="button"
              className="wrong-answer"
              onClick={ () => handleButtons(true) }
            >
              { wrong }
            </button>
          )) }
        </li>
      </ul>
    );
  }
}

Answers.propTypes = {
  questionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleButtons: PropTypes.func.isRequired,
};

export default Answers;
