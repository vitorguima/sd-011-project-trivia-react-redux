import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import questionAPI from '../services';
import Header from './Header';
import '../App.css';
import { updateScore } from '../actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: undefined,
      correct: false,
      incorrect: false,
      timer: 30,
      finishTimer: false,
      clicked: false,
      isDisabled: false,
      regularBorder: 'regular-border',
    };
  }

  componentDidMount() {
    this.handleQuestions();
    this.startTimer();
  }

  componentDidUpdate() {
    this.startTimer();
  }

  async handleQuestions() {
    const data = await questionAPI();
    this.setState({
      questions: data.results,
    });
  }

  handleClickIncorrect() {
    this.setState({
      incorrect: true,
      correct: true,
      clicked: true,
      isDisabled: true,
    });
  }

  handleClickCorrect() {
    this.setState({
      incorrect: true,
      correct: true,
      clicked: true,
      isDisabled: true,
    });
    this.sumScore();
  }

  startTimer() {
    const { timer, finishTimer, clicked } = this.state;
    const countTime = 1000;

    if (!clicked) {
      if (timer > 0) {
        setTimeout(() => this.setState({ timer: timer - 1 }), countTime);
      }
      if (timer === 0 && !finishTimer) {
        this.setState({
          finishTimer: true,
        });
        this.handleClickIncorrect();
      }
    }
  }

  sumScore() {
    const { timer, questions, index } = this.state;
    const { assertions, name, gravatarEmail, updateNewScore } = this.props;
    let newScore = 0;
    const three = 3;
    const ten = 10;
    if (questions[index].difficulty === 'easy') {
      newScore = (timer * 1) + ten;
    } else if (questions[index].difficulty === 'medium') {
      newScore = (timer * 2) + ten;
    } else if (questions[index].difficulty === 'hard') {
      newScore = (timer * three) + ten;
    }
    const finalAssertions = assertions + 1;
    const player = { player: {
      gravatarEmail,
      name,
      score: newScore,
      assertions: finalAssertions,
    } };
    updateNewScore(newScore, finalAssertions);
    console.log(player);
    return localStorage.setItem('state', JSON.stringify(player));
  }

  resetBtn() {
    const { index } = this.state;
    const { history } = this.props;
    const four = 4;
    if (index < four) {
      this.setState({
        index: index + 1,
        isDisabled: false,
      });
    } else {
      history.push('/feedback');
    }
  }

  renderBtn() {
    const { isDisabled } = this.state;
    if (!isDisabled) return null;
    return (
      <button
        onClick={ () => this.resetBtn() }
        data-testid="btn-next"
        type="button"
      >
        Próxima
      </button>
    );
  }

  renderAnswers() {
    const { questions, index, incorrect, regularBorder, isDisabled } = this.state;
    const incorrectAnswers = questions[index].incorrect_answers;
    const multipleLength = 3;
    const redBorder = 'red-border';

    if (incorrectAnswers.length === multipleLength) {
      return this.renderIncorrectAnswers();
    }
    return (
      <div>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid={ `wrong-answer-${0}` }
          className={ incorrect ? redBorder : regularBorder }
          onClick={ () => this.handleClickIncorrect(!incorrect) }
        >
          { incorrectAnswers[0] }
        </button>
      </div>
    );
  }

  renderIncorrectAnswers() {
    const { questions, index, incorrect, regularBorder, isDisabled } = this.state;
    const incorrectAnswers = questions[index].incorrect_answers;
    const redBorder = 'red-border';
    return (
      <div>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid={ `wrong-answer-${0}` }
          className={ incorrect ? redBorder : regularBorder }
          onClick={ () => this.handleClickIncorrect(!incorrect) }
        >
          { incorrectAnswers[0] }
        </button>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid={ `wrong-answer-${1}` }
          className={ incorrect ? redBorder : regularBorder }
          onClick={ () => this.handleClickIncorrect(!incorrect) }
        >
          { incorrectAnswers[1] }
        </button>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid={ `wrong-answer-${2}` }
          className={ incorrect ? redBorder : regularBorder }
          onClick={ () => this.handleClickIncorrect(!incorrect) }
        >
          { incorrectAnswers[2] }
        </button>
      </div>
    );
  }

  render() {
    const { questions, index, correct, timer, isDisabled, regularBorder } = this.state;
    return (
      <div>
        <Header />
        { !questions
          ? <p>Loading...</p>
          : (
            <div>
              <h3 data-testid="question-category">{ questions[index].category }</h3>
              <h3 data-testid="question-text">{ questions[index].question }</h3>
              <h3>
                <button
                  disabled={ isDisabled }
                  type="button"
                  data-testid="correct-answer"
                  value="correct"
                  className={ correct ? 'green-border' : regularBorder }
                  onClick={ () => this.handleClickCorrect(!correct) }
                >
                  { questions[index].correct_answer }
                </button>
                { this.renderAnswers() }
              </h3>
              <span>{ this.renderBtn() }</span>
              <span>{ timer }</span>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.playerReducer.score,
  assertions: state.playerReducer.assertions,
  name: state.playerReducer.name,
  gravatarEmail: state.playerReducer.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  updateNewScore: (score, assertions) => dispatch(updateScore(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  updateNewScore: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};
