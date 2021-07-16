import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class HandleQuestions extends Component {
  componentDidMount() {
    const { token, fetchAPIQuestions } = this.props;
    fetchAPIQuestions(token);
  }

  handleQuestions({ results }) {
    if (results) {
      return (
        <section>
          <h3 data-testid="question-category">{results[0].category}</h3>
          <h3 data-testid="question-text">{results[0].question}</h3>
          <button
            data-testid="correct-answer"
            type="button"
          >
            {results[0].correct_answer}
          </button>
          {results[0].incorrect_answers.map((answer, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              type="button"
            >
              {answer}
            </button>
          ))}
          <button type="button">Proximo</button>
        </section>
      );
    }
  }

  render() {
    const { questionsData } = this.props;
    return (
      <>
        {this.handleQuestions(questionsData)}
      </>
    );
  }
}

HandleQuestions.propTypes = {
  fetchAPIQuestions: PropTypes.func.isRequired,
  token: PropTypes.bool.isRequired,
  questionsData: PropTypes.shape({
    results: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questionsData: state.gameReducer.questionsData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIQuestions: (parm) => dispatch(actions.fetchAPIQuestions(parm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandleQuestions);
