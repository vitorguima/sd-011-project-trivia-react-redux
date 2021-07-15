import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Answer extends Component {
  render() {
    const { questions: { results } } = this.props;
    const arrayOfResults = Object.values({ ...results });
    const question = arrayOfResults[0];
    arrayOfResults.map(({ question }) => console.log(question));
    return (
      <>
        { arrayOfResults.map(({ question }) => <p>{ question }</p>) }
        {/* { arrayOfResults.map((incAnswer, index) => (
          <div key={ `chave ${index}` }>
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              { incAnswer.incorrect_answers }
            </button>

          </div>
        )) } */}
        <div>
          a
        </div>
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
