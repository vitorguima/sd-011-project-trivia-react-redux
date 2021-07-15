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
    };
    this.onClickQuestion = this.onClickQuestion.bind(this);
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

  render() {
    const { questions } = this.props;
    const { results } = questions.questions;
    const { clickedQuestions, timer } = this.state;

    if (!results) return <h3>Loading...</h3>;

    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">{results[0].category}</p>
          <p data-testid="question-text" onLoad={ this.startTimer() }>
            {results[0].question}
          </p>
          <span>{timer}</span>
          <button
            disabled={ timer === 0 }
            type="button"
            data-testid="correct-answer"
            onClick={ this.onClickQuestion }
            style={
              clickedQuestions ? { border: '3px solid rgb(6, 240, 15)' } : null
            }
          >
            {results[0].correct_answer}
          </button>
          {results[0].incorrect_answers.map((answer, index) => (
            <button
              disabled={ timer === 0 }
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.onClickQuestion }
              style={
                clickedQuestions ? { border: '3px solid rgb(255, 0, 0)' } : null
              }
            >
              {answer}
            </button>
          ))}
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
