import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { fetchTokenApi } from '../actions/index';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      clickedQuestions: false,
      timer: 30,
      index: 0,
    };
    this.onClickQuestion = this.onClickQuestion.bind(this);
    this.goNextQuestion = this.goNextQuestion.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    const token = localStorage.getItem('token');
    if (token) fetchToken(token);
  }

  onClickQuestion({ target: { name } }) {
    this.setState({
      clickedQuestions: true,
    });
    if (name === 'correctAnswer') {
      this.sumScore();
      const store = JSON.parse(localStorage.getItem('state'));
      store.player.assertions += 1;
      localStorage.setItem('state', JSON.stringify(store));
    }
  }

  startTimer() {
    const { timer, clickedQuestions } = this.state;
    const time = 1000;
    const timeout = setTimeout(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      time,
    );
    if (timer === 0 || clickedQuestions) {
      clearTimeout(timeout);
    }
  }

  goNextQuestion() {
    this.setState((prevState) => ({ index: prevState.index + 1, timer: 30 }));
  }

  questionAnswered() {
    const { clickedQuestions, timer } = this.state;
    if (clickedQuestions || timer === 0) {
      return true;
    }
    return false;
  }

  sumScore() {
    const { timer, index } = this.state;
    const { questions } = this.props;
    const { results } = questions.questions;
    const question = results[index];
    const basePoint = 10;
    const storage = JSON.parse(localStorage.getItem('state'));

    if (question.difficulty === 'hard') {
      const hard = 3;
      storage.player.score += basePoint + timer * hard;
    }
    if (question.difficulty === 'medium') {
      const medium = 2;
      storage.player.score += basePoint + timer * medium;
    } else {
      const easy = 1;
      storage.player.score += basePoint + timer * easy;
    }
    localStorage.setItem('state', JSON.stringify(storage));
  }

  renderTimer(timer, results, clickedQuestions) {
    return (
      <div>
        <span>{timer}</span>
        <button
          disabled={ timer === 0 }
          type="button"
          data-testid="correct-answer"
          onClick={ this.onClickQuestion }
          style={
            clickedQuestions ? { border: '3px solid rgb(6, 240, 15)' } : null
          }
          name="correctAnswer"
        >
          {results[index].correct_answer}
        </button>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    const { results } = questions.questions;
    const { clickedQuestions, timer, index } = this.state;
    const finalQuestion = 5;

    if (!results) return <h3>Loading...</h3>;

    if (index === finalQuestion) {
      return <Redirect to="feedback" />;
    }
    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">{results[index].category}</p>
          <p data-testid="question-text" onLoad={ this.startTimer() }>
            {results[index].question}
          </p>
          {this.renderTimer(timer, results, clickedQuestions)}
          {results[index].incorrect_answers.map((answer, idx) => (
            <button
              disabled={ timer === 0 }
              type="button"
              key={ idx }
              data-testid={ `wrong-answer-${idx}` }
              onClick={ this.onClickQuestion }
              style={
                clickedQuestions ? { border: '3px solid rgb(255, 0, 0)' } : null
              }
              name="IncorrectAnswer"
            >
              {answer}
            </button>
          ))}
          {this.questionAnswered() && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.goNextQuestion }
            >
              Próxima
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (token) => dispatch(fetchTokenApi(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  questions: PropTypes.oneOfType([
    PropTypes.PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.string),
    }),
    PropTypes.string,
  ]).isRequired,
};
