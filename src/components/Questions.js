import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // answered: false,
      correctAnswer: 'answer',
      wrongAnswer: 'answer',
    };

    this.handleClick = this.handleClick.bind(this);
    // this.correctAnswer = this.correctAnswer.bind(this);
    // this.wrongAnswer = this.wrongAnswer.bind(this);
  }

  handleClick() {
    this.setState({
      correctAnswer: 'correct-answer',
      wrongAnswer: 'wrong-answer',
    });
  }

  // correctAnswer() {
  //   const { answered } = this.state;
  //   return answered ? 'correct-answer' : 'answer';
  // }

  // wrongAnswer() {
  //   const { answered } = this.state;
  //   return answered ? 'wrong-answer' : 'answer';
  // }

  render() {
    const { questionsState, loading } = this.props;
    const { correctAnswer, wrongAnswer } = this.state;

    return (
      <div>
        {loading
          ? <h4>Loading...</h4>
          : (
            <div>
              <p data-testid="question-category">{ questionsState[0].category }</p>
              <h3 data-testid="question-text">{ questionsState[0].questions }</h3>
              <button
                data-testid="correct-answer"
                className={ correctAnswer }
                type="button"
                onClick={ () => this.handleClick() }
              >
                { questionsState[0].correct_answer }
              </button>
              { questionsState[0].incorrect_answers.map((incorrect, key) => (
                <button
                  data-testid={ `wrong-answer-${key}` }
                  className={ wrongAnswer }
                  type="button"
                  key={ key }
                  onClick={ () => this.handleClick() }
                >
                  { incorrect }
                </button>
              )) }
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsState: state.questionsReducer.questions,
  loading: state.questionsReducer.loading,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  questionsState: PropTypes.arrayOf().isRequired,
  loading: PropTypes.bool.isRequired,
};
