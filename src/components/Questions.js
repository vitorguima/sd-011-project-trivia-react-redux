import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { newQuestion:
      { question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } } = this.props;
    const randomAnswers = [correctAnswer, ...incorrectAnswers]
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    return (
      <div>
        <h1>
          { question }
        </h1>
        {randomAnswers.map((answer, index) => <p key={ index }>{ answer }</p>)}
      </div>

    );
  }
}

Question.propTypes = {
  newQuestion: PropTypes.isRequired,
};

export default Question;
