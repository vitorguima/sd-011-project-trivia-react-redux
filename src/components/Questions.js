import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Questions.css';
import { disableButtonTrue, roleQuestions, answeredQuestion } from '../actions';
import * as serviceLocalStorage from '../services/LocalStorage';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      time: null,
      score: 0,
      assertion: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.initailTime = this.initailTime.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.scoreMode = this.scoreMode.bind(this);
    this.roleQuestions = this.roleQuestions.bind(this);
    this.nextQuestionButton = this.nextQuestionButton.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.getScoreLocalStorage = this.getScoreLocalStorage.bind(this);
  }

  componentDidMount() {
    this.initailTime();
    this.getScoreLocalStorage();
  }

  componentDidUpdate() {
    const { answered } = this.props;
    if (!answered) {
      this.decrementTime();
    }
  }

  async getScoreLocalStorage() {
    const state = await serviceLocalStorage.getPlayerLocalStorage();
    const { score } = state.player;
    console.log(score);
    this.setState({
      score,
    });
  }

  handleClick({ target }) {
    const { value } = target;
    this.setState({
      assertion: parseInt(value, 10),
    }, () => {
      this.saveScore();
      this.getScoreLocalStorage();
    });
  }

  decrementTime() {
    const { time } = this.state;
    const interval = 1000;
    if (time > 0) {
      setTimeout(() => {
        this.setState({
          time: time - 1,
        });
      }, interval);
    } else {
      const { timeOut } = this.props;
      timeOut(true);
    }
  }

  initailTime() {
    this.setState({
      time: 30,
    });
  }

  scoreMode() {
    const { questionsState, position } = this.props;
    const difficultyQuestion = questionsState[position].difficulty;
    const { time, assertion } = this.state;
    let score = 0;
    const ten = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    if (difficultyQuestion === 'hard') {
      score = ten + (time * hard);
    } else if (difficultyQuestion === 'medium') {
      score = ten + (time * medium);
    } else if (difficultyQuestion === 'easy') {
      score = ten + (time * easy);
    }
    const totalScore = score * assertion;
    return totalScore;
  }

  async saveScore() {
    const state = await serviceLocalStorage.getPlayerLocalStorage();
    console.log(state);
    const questionScore = this.scoreMode();
    const { assertion } = this.state;
    const newState = {
      player: {
        name: state.player.name,
        assertions: state.player.assertions + assertion,
        score: state.player.score + questionScore,
        gravatarEmail: state.player.gravatarEmail,
      },
    };
    serviceLocalStorage.updateScoreLocalStorage(newState);
    this.setState({
      assertion: 0,
    }, () => {
      const { inAnswerQuestion } = this.props;
      inAnswerQuestion(true);
    });
  }

  roleQuestions() {
    const {
      nextQuestion,
      inAnswerQuestion,
      position,
      feedback,
    } = this.props;
    const limit = 4;
    if (position < limit) {
      nextQuestion(1);
      inAnswerQuestion(false);
      this.setState({
        time: 30,
      });
    } else {
      feedback('/feedback');
    }
  }

  correctAnswer() {
    const { answered } = this.props;
    return !answered ? 'answer' : 'correct-answer';
  }

  wrongAnswer() {
    const { answered } = this.props;
    return !answered ? 'answer' : 'wrong-answer';
  }

  nextQuestionButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => this.roleQuestions() }
      >
        Próxima
      </button>
    );
  }

  render() {
    const { questionsState, loading, buttonsDisabled, position, answered } = this.props;
    const { time, score } = this.state;
    return (
      <div>
        <p>{ time }</p>
        <p>{ score }</p>
        {loading
          ? <h4>Loading...</h4>
          : (
            <div>
              <p data-testid="question-category">{ questionsState[position].category }</p>
              <h3 data-testid="question-text">{ questionsState[position].question }</h3>
              <button
                data-testid="correct-answer"
                className={ this.correctAnswer() }
                type="button"
                value={ 1 }
                onChange
                disabled={ buttonsDisabled }
                onClick={ (e) => this.handleClick(e) }
              >
                { questionsState[position].correct_answer }
              </button>
              { questionsState[position].incorrect_answers.map((incorrect, key) => (
                <button
                  data-testid={ `wrong-answer-${key}` }
                  className={ this.wrongAnswer() }
                  type="button"
                  key={ key }
                  value={ 0 }
                  disabled={ buttonsDisabled }
                  onClick={ (e) => this.handleClick(e) }
                >
                  { incorrect }
                </button>
              )) }
              <div className="section-button-next">
                {
                  answered && this.nextQuestionButton()
                }
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsState: state.questionsReducer.questions,
  loading: state.questionsReducer.loading,
  position: state.questionsReducer.position,
  answered: state.questionsReducer.answered,
  buttonsDisabled: state.timerReducer.buttonsDisabledFromTimer,
});

const mapDispatchToProps = (dispatch) => ({
  timeOut: (disabled) => dispatch(disableButtonTrue(disabled)),
  inAnswerQuestion: (value) => dispatch(answeredQuestion(value)),
  nextQuestion: (position) => dispatch(roleQuestions(position)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  feedback: PropTypes.func.isRequired,
  buttonsDisabled: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  inAnswerQuestion: PropTypes.func.isRequired,
  questionsState: PropTypes.arrayOf().isRequired,
  loading: PropTypes.bool.isRequired,
  timeOut: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
};
