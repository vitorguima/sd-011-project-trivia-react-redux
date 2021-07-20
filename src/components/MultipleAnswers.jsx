import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MultipleAnswers extends React.Component {
  render() {
    const { question, disabled, handleQuestionAnswered, answers } = this.props;

    return (
      <>
        {
          answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              onClick={ handleQuestionAnswered }
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

const mapStateToProps = ({ gameReducer: { question, answers } }) => ({
  question,
  answers,
});

export default connect(mapStateToProps)(MultipleAnswers);

MultipleAnswers.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
  disabled: PropTypes.bool,
  handleQuestionAnswered: PropTypes.func,
}.isRequired;
