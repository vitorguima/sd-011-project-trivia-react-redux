import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchApiToken } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      position: 0,
      timer: 30,
      answerClicked: false,
    };
    this.nextQuestionButtonClicked = this.nextQuestionButtonClicked.bind(this);
    this.answerButtonClicked = this.answerButtonClicked.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    const token = localStorage.getItem('token');
    if (token) fetchToken(token);
  }

  answerButtonClicked({ target: { name } }) {
    this.setState({
      answerClicked: true,
    });
    if (name === 'correctAnswer') {
      const notRedux = JSON.parse(localStorage.getItem('state'));
      notRedux.user.assertions += 1;
      localStorage.setItem('state', JSON.stringify(notRedux));
    }
  }

  nextQuestionButtonClicked() {
    this.setState((prevState) => ({ position: prevState.position + 1 }));
  }

  renderNextButton() {
    const { answerClicked, timer } = this.state;
    if (answerClicked || timer === 0) {
      return true;
    }
    return false;
  }

  renderTimer(timer, results, answerClicked, position) {
    return (
      <div>
        <span>{timer}</span>
        <li>
          <button
            disabled={ timer === 0 }
            type="button"
            data-testid="correct-answer"
            onClick={ this.answerButtonClicked }
            style={
              answerClicked ? { border: '3px solid rgb(6, 240, 15)' } : null
            }
            name="correctAnswer"
          >
            {results[position].correct_answer}
          </button>
        </li>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    const { results } = questions;
    const { answerClicked, position, timer } = this.state;
    const maxQuestion = 5;
    if (!results) return <h2>Carregando...</h2>;
    if (position === maxQuestion) {
      return <Redirect to="/feedback" />;
    }
    return (
      <>
        <Header />
        <p data-testid="question-category">{results[position].category}</p>
        <p data-testid="question-text">
          {results[position].question}
        </p>
        <ul>
          {this.renderTimer(timer, results, answerClicked, position)}
          {results[position].incorrect_answers.map((answer, index) => (
            <li key={ index }>
              <button
                disabled={ timer === 0 }
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.answerButtonClicked }
                style={
                  answerClicked ? { border: '3px solid rgb(255, 0, 0)' } : null
                }
                name="IncorrectAnswer"
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
        {this.renderNextButton() && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestionButtonClicked }
          >
            Próxima pergunta
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (token) => dispatch(fetchApiToken(token)),
});

Game.propTypes = {
  questionAnswered: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
