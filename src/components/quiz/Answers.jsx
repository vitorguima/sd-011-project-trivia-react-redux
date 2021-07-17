import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  render() {
    const { questionsList, isDisabled, handleButtons } = this.props;
    return (
      <ul className="list-buttons-quiz">
        <li className="item-list-buttons-quiz">
          <button
            disabled={ isDisabled }
            data-testid="correct-answer"
            className={ isDisabled ? 'li-quiz-button correct-answer' : 'li-quiz-button' }
            type="button"
            onClick={ () => handleButtons(true) }
          >
            { questionsList.correct_answer }
          </button>
        </li>
        { questionsList.incorrect_answers.map((wrong, index) => (
          <li className="item-list-buttons-quiz" key={ index }>
            <button
              disabled={ isDisabled }
              data-testid={ `wrong-answer-${index}` }
              className={ isDisabled ? 'li-quiz-button wrong-answer' : 'li-quiz-button' }
              type="button"
              onClick={ () => handleButtons(true) }
            >
              { wrong }
            </button>
          </li>
        )) }
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
