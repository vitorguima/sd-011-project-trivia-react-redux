import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class Questions extends Component {
  async componentDidMount() {
    const { getQuestions, token } = this.props;
    await getQuestions(token);
  }

  render() {
    const { questions } = this.props;
    const { results } = questions;
    console.log(results);
    return (
      <div>
        <span data-testId="question-category">Categoria</span>
        <h2 data-testId="question-text">Texto da questão</h2>
        <div>
          <button type="button" data-testid="`wrong-answer-{index}`">question01</button>
          <button type="button" data-testid="`wrong-answer-{index}`">question02</button>
          <button type="button" data-testid="`wrong-answer-{index}`">question03</button>
          <button type="button" data-testid="correct-answer">question04</button>
        </div>
        <div>
          <button type="button" data-testid="`wrong-answer-{index}`">
            verdadeiro
          </button>

          <button type="button" data-testid="correct-answer">
            falso
          </button>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  getQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

const mapStateToProps = (state) => ({
  token: state.homeReducer.token,
  questions: state.homeReducer.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
