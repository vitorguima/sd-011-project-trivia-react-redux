import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { fetchQuestionsAPI } from '../actions/game';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      toggleButton: false,
      startCount: 30,
      endCount: 0,
      disableAnswersButtons: false,
    };
    this.toggleButtonClass = this.toggleButtonClass.bind(this);
    this.handleCount = this.handleCount.bind(this);
  }

  componentDidMount() {
    const { tokenData, fetchQuestion } = this.props;
    fetchQuestion(tokenData);
    this.counter();
  }

  toggleButtonClass() {
    this.setState({ toggleButton: true });
  }

  handleCount() {
    const { startCount, endCount } = this.state;
    return startCount !== endCount ? this.setState((prevState) => ({
      startCount: prevState.startCount - 1,
    })) : this.setState({ disableAnswersButtons: true });
  }

  counter() {
    const timeInterval = 1000;
    setInterval(() => {
      this.handleCount();
    }, timeInterval);
  }

  render() {
    const { toggleButton, startCount, disableAnswersButtons } = this.state;
    const { questionData } = this.props;

    if (questionData.length) {
      const questionOne = questionData[0];
      return (
        <div>
          { console.log(startCount) }
          <h1>
            { startCount }
          </h1>
          <Header />
          <p data-testid="question-category">{ questionOne.category }</p>
          <p data-testid="question-text">{ questionOne.question }</p>
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.toggleButtonClass }
            className={ toggleButton ? 'correct-btn' : null }
            disabled={ disableAnswersButtons }
          >
            { questionOne.correct_answer }
          </button>
          { questionOne.incorrect_answers.map((answer, inx) => (
            <button
              key={ inx }
              type="button"
              data-testid={ `wrong-answer-${inx}` }
              onClick={ this.toggleButtonClass }
              className={ toggleButton ? 'incorrect-btn' : null }
              disabled={ disableAnswersButtons }
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
