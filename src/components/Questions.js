import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { fetchQuestionsAPI } from '../actions/game';
import Counter from './Counter';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      toggleButton: false,
    };
    this.toggleButtonClass = this.toggleButtonClass.bind(this);
  }

  componentDidMount() {
    const { tokenData, fetchQuestion } = this.props;
    fetchQuestion(tokenData);
  }

  toggleButtonClass() {
    this.setState({ toggleButton: true });
  }

  render() {
    const { toggleButton } = this.state;
    const { questionData, buttonsStatus } = this.props;
    if (questionData.length) {
      const questionOne = questionData[0];
      return (
        <div className="main-container">
          <Header />
          <div className="questions-container">
            <Counter />
            <p data-testid="question-category">{ questionOne.category }</p>
            <p data-testid="question-text">{ questionOne.question }</p>
            <div className="buttons-container">
              <button
                type="button"
                data-testid="correct-answer"
                onClick={ this.toggleButtonClass }
                className={ toggleButton ? 'correct-btn' : null }
                disabled={ buttonsStatus }
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
                  disabled={ buttonsStatus }
                >
                  { answer }
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return <p>Loading questions...</p>;
  }
}

const mapStateToProps = (state) => ({
  tokenData: state.login.token,
  questionData: state.game.questions,
  buttonsStatus: state.game.answerButtons,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: (token) => dispatch(fetchQuestionsAPI(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  tokenData: PropTypes.string.isRequired,
  questionData: PropTypes.arrayOf.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  buttonsStatus: PropTypes.func.isRequired,
};
