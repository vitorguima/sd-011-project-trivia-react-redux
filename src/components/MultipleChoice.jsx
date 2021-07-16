import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNextBtn } from '../actions';

class MultipleChoice extends React.Component {
  render() {
    const { question, showBtn, disabled } = this.props;
    return (
      question.answers.map((answer, index) => {
        if (question.correct_answer === answer) {
          return (
            <button
              disabled={ disabled }
              data-testid="correct-answer"
              key={ index }
              type="button"
              onClick={ () => showBtn() }
            >
              { answer }
            </button>
          );
        }
        return (
          <button
            disabled={ disabled }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            type="button"
            onClick={ () => showBtn() }
          >
            { answer }
          </button>
        );
      })
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showBtn: () => dispatch(showNextBtn()),
});

MultipleChoice.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
  }).isRequired,
  showBtn: PropTypes.func.isRequired,
  disabled: (PropTypes.bool).isRequired,
};

export default connect(null, mapDispatchToProps)(MultipleChoice);
