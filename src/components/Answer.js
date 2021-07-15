import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Answer extends Component {
  render() {
    let count = 0;
    const { questions: { results } } = this.props;
    const arrayOfResults = Object.values({ ...results });
    const question = arrayOfResults[0];
    return (
      <>
        {/* { console.log(arrayOfResults[0]) } */}
        { arrayOfResults.map((incAnswer, index) => (
          <div key={ `chave ${index}` }>
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              { incAnswer.incorrect_answers[count] }
            </button>

          </div>
        )) }
        <div>
          a
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.fetchReducers.questions,
});

// const mapDispatchToProps = {
// }

export default connect(mapStateToProps)(Answer);

Answer.propTypes = {
  questions: PropTypes.array,
}.isRequired;
