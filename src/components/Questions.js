import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { fetchQuestionsAPI, updateScore, questionDifficulty } from '../actions/game';
import { stopCounter } from '../actions/counter';
import Counter from './Counter';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      toggleButton: false,
    };
    this.toggleButtonClass = this.toggleButtonClass.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  componentDidMount() {
    const { tokenData, fetchQuestion } = this.props;
    fetchQuestion(tokenData);
    let state = localStorage.getItem('state');
    if (!state) {
      state = {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
    }
  }

  toggleButtonClass() {
    this.setState({ toggleButton: true });
  }

  handleScore(difficulty) {
    const { sendDifficulty, stoppingCounter } = this.props;
    stoppingCounter();
    sendDifficulty(difficulty);
    this.toggleButtonClass();
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
                onClick={ () => this.handleScore(questionOne.difficulty) }
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
  userName: state.login.user,
  userEmail: state.login.email,
  tokenData: state.login.token,
  questionData: state.game.questions,
  buttonsStatus: state.game.answerButtons,
  currentScore: state.game.score,
  counterStatus: state.counter.counterStatus,
  timePoints: state.counter.counterPoints,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestion: (token) => dispatch(fetchQuestionsAPI(token)),
  score: (questionScore) => dispatch(updateScore(questionScore)),
  stoppingCounter: () => dispatch(stopCounter()),
  sendDifficulty: (difficulty) => dispatch(questionDifficulty(difficulty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  tokenData: PropTypes.string.isRequired,
  questionData: PropTypes.arrayOf.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  buttonsStatus: PropTypes.func.isRequired,
  currentScore: PropTypes.number.isRequired,
  score: PropTypes.func.isRequired,
  stoppingButton: PropTypes.bool.isRequired,
};
