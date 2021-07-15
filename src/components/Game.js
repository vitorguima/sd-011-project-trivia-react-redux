import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    const token = localStorage.getItem('token');
    if (token) fetchToken(token);
  }

  onClickQuestion() {
    this.setState({
      clickedQuestions: true,
    });
  }

  startTimer() {
    const { timer } = this.state;
    const time = 1000;
    const timeout = setTimeout(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      time,
    );
    if (timer === 0) {
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

  render() {
    const { questions } = this.props;
    const { results } = questions.questions;
    const { clickedQuestions, timer, index } = this.state;
    if (!results) return <h3>Loading...</h3>;
    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">{results[index].category}</p>
          <p data-testid="question-text" onLoad={ this.startTimer() }>
            {results[index].question}
          </p>
          <span>{timer}</span>
          <button
            disabled={ timer === 0 }
            type="button"
            data-testid="correct-answer"
            onClick={ this.onClickQuestion }
            style={ clickedQuestions ? { border: '3px solid rgb(6, 240, 15)' } : null }
          >
            {results[index].correct_answer}
          </button>
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
