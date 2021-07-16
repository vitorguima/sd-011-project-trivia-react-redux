import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions, getToken } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      sucess: false,
      loss: false,
    };
    this.handleSucess = this.handleSucess.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, fetchToken } = this.props;
    fetchToken();
    fetchQuestions();
  }

  handleSucess() {
    this.setState({ sucess: true });
  }

  handleLoss() {
    this.setState({ loss: true });
  }

  render() {
    const { name, score, email, questions } = this.props;
    const { index, sucess, loss } = this.state;
    if (!questions.length && name) {
      return <div>Loading...</div>;
    }
    const {
      category,
      question, correct_answer:
      correntAnswer,
      incorrect_answers:
      incorrectAnswer,
    } = questions[index];
    return (
      <section>
        <header>
          <div className="player-info">
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
              alt="user thumbnail"
            />
            <h3 data-testid="header-player-name">
              { name }
            </h3>
            <p data-testid="header-score">
              Score:
              { score }
            </p>
          </div>
        </header>
        <div className="container">
          <p data-testid="question-category">
            { category }
          </p>
          <p data-testid="question-text">
            { question }
          </p>
          <button
            className={`${sucess ? 'sucess' : ''}`}
            onClick={ this.handleSucess }
            type="button"
            data-testid="correct-answer"
          >
            { correntAnswer }
          </button>
          {incorrectAnswer.map((answer, idx) => (
            <button
              className={`${loss ? 'loss' : ''}`}
              onClick={ this.handleLoss }
              data-testid={ `wrong-answer-${idx}` }
              type="button" key={ idx }
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(getQuestions()),
  fetchToken: () => dispatch(getToken()),
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  userToken: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
