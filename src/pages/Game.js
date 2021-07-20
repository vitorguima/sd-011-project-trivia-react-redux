import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getQuestions, getToken } from '../actions';
import HeaderGame from '../components/HeaderGame';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      sucess: false,
      loss: false,
      counter: 30,
      disabled: false,
    };
    this.handleSucess = this.handleSucess.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
    this.fetchQuest = this.fetchQuest.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    fetchToken();
    this.fetchQuest();
    this.timer();
    this.getStorage();
  }

  componentWillUnmount() {
    clearInterval(this.count);
  }

  getStorage() {
    const storage = JSON.parse(localStorage.getItem('player'));
    // console.log(storage);
    return storage;
  }

  timer() {
    const sec = 1000;
    this.count = setInterval(() => {
      const { counter } = this.state;
      if (counter > 0) {
        this.setState({ counter: counter - 1 });
      }
      if (counter === 0) {
        clearInterval(this.count);
        this.setState({ disabled: true });
      }
    }, sec);
  }

  async fetchQuest() {
    const { fetchQuestions } = this.props;
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const { data } = await axios.get(URL);
    // console.log(data.token);
    fetchQuestions(data.token);
  }

  handleSucess(difficulty) {
    this.setState({ sucess: true });
    this.setState({ loss: true });
    let ponto = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const initial = 10;
    const { name, userToken } = this.props;
    const { counter } = this.state;
    if (difficulty === 'easy') {
      ponto = initial + (counter * easy);
    } else if (difficulty === 'medium') {
      ponto = initial + (counter * medium);
    } else {
      ponto = initial + (counter * hard);
    }
    const player = {
      name,
      assertions: this.getStorage().assertions + 1,
      score: this.getStorage().score + ponto,
      gravatarEmail: userToken,
    };
    localStorage.setItem('player', JSON.stringify(player));
  }

  handleLoss() {
    this.setState({ loss: true });
    this.setState({ sucess: true });
  }

  render() {
    const { questions } = this.props;
    const { index, sucess, loss } = this.state;
    if (!questions.length) return <div>Loading...</div>;
    const {
      category,
      question, correct_answer:
      currentAnswer,
      incorrect_answers:
      incorrectAnswer,
      difficulty,
    } = questions[index];
    const { counter, disabled } = this.state;
    return (
      <section>
        <HeaderGame />
        { counter }
        <div className="container">
          <p data-testid="question-category">
            { category }
          </p>
          <p data-testid="question-text">
            { question }
          </p>
          <button
            className={ `${sucess ? 'sucess' : ''}` }
            onClick={ () => this.handleSucess(difficulty) }
            type="button"
            data-testid="correct-answer"
            disabled={ disabled }
          >
            { currentAnswer }
          </button>
          {incorrectAnswer.map((answer, idx) => (
            <button
              className={ `${loss ? 'loss' : ''}` }
              onClick={ this.handleLoss }
              data-testid={ `wrong-answer-${idx}` }
              type="button"
              key={ idx }
              disabled={ disabled }
            >
              { answer }
            </button>
          ))}
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.login.score,
  email: state.login.email,
  questions: state.login.questions,
  loading: state.login.loading,
  userToken: state.login.userToken,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(getQuestions(token)),
  fetchToken: () => dispatch(getToken()),
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  userToken: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
