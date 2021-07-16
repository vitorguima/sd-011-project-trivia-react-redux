import React from 'react';
import PropTypes from 'prop-types';

const fiftyPercent = 0.5;
const caseTrue = 1;
const caseFalse = -1;

class MultipleAnswers extends React.Component {
  changeColor({ target }) {
    const getButtons = target.parentElement.children;

    for (let index = 0; index < getButtons.length; index += 1) {
      if (getButtons[index].dataset.testid === 'correct-answer') {
        getButtons[index].classList.add('correct');
      } else {
        getButtons[index].classList.add('incorrect');
      }
    }
  }

  render() {
    const { question, disabled } = this.props;
    const answers = [question.correct_answer, ...question.incorrect_answers];

    /*
      shuffle array js
      source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    */
    answers.sort(() => (Math.random() > fiftyPercent ? caseTrue : caseFalse));

    return (
      <>
        {
          answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              onClick={ this.changeColor }
              disabled={ disabled }
              data-testid={
                question.incorrect_answers.includes(answer)
                  ? `wrong-answer-${question.incorrect_answers.indexOf(answer)}`
                  : 'correct-answer'
              }
            >
              { answer }
            </button>
          ))
        }
      </>
    );
  }
}

export default MultipleAnswers;

MultipleAnswers.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
  disabled: PropTypes.bool,
}.isRequired;
