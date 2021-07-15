import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { fetchQuestionsAPI } from '../actions/game';

class Questions extends Component {
  componentDidMount() {
    const { tokenData, fetchQuestion } = this.props;
    fetchQuestion(tokenData);
  }

  render() {
    const { questionData } = this.props;
    if (questionData.length) {
      const questionOne = questionData[0];
      return (
        <div>
          <Header />
          <p data-testid="question-category">{ questionOne.category }</p>
          <p data-testid="question-text">{ questionOne.question }</p>
          <button
            type="button"
            data-testid="correct-answer"
          >
            { questionOne.correct_answer }
          </button>
          { questionOne.incorrect_answers.map((answer, inx) => (
            <button
              key={ inx }
              type="button"
              data-testid={ `wrong-answer-${inx}` }
            >
              { answer }
            </button>
          ))}
        </div>
      );
    }
    return <p>Loading questions...</p>;
  }
}

const mapStateToProps = (state) => ({
  tokenData: state.login.token,
  questionData: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: (token) => dispatch(fetchQuestionsAPI(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  tokenData: PropTypes.string.isRequired,
  questionData: PropTypes.arrayOf.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
};
