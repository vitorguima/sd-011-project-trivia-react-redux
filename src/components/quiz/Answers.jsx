import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  render() {
    const { questionsList } = this.props;
    return (
      <ul>
        <li>
          <button data-testid="correct-answer" className="correct-answer" type="button">
            { questionsList.correct_answer }
          </button>
          { questionsList.incorrect_answers.map((wrong, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              type="button"
              className="wrong-answer"
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
};

export default Answers;
