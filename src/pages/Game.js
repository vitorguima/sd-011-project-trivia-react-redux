import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import * as actions from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.setItemOnLocalStorage = this.setItemOnLocalStorage.bind(this);
  }

  componentDidMount() {
    const { fetchAPIQuestions, token } = this.props;
    fetchAPIQuestions(token);
  }

  setItemOnLocalStorage() {
    const { isLoading } = this.props;
    if (!isLoading) {
      const { token, name, score, email } = this.props;
      const player = {
        name,
        assertions: 0,
        score,
        gravatarEmail: email,
      };
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('player', JSON.stringify(player));
    }
  }

  handleQuestions({ results }) {
    if (results) {
      return (
        <section>
          <h3 data-testid="question-category">{results[0].category}</h3>
          <h3 data-testid="question-text">{results[0].question}</h3>
          <button
            data-testid="correct-answer"
            type="button"
          >
            {results[0].correct_answer}
          </button>
          {results[0].incorrect_answers.map((answer, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              type="button"
            >
              {answer}
            </button>
          ))}
        </section>
      );
    }
  }

  render() {
    const { name, email, score, questionsData } = this.props;
    this.setItemOnLocalStorage();
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="Imagem do Email"
          />
          <p data-testid="header-player-name">{ name }</p>
          <span data-testid="header-score">{ score }</span>
        </header>
        {this.handleQuestions(questionsData)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  isLoading: state.loginReducer.isLoading,
  name: state.playerReducer.name,
  email: state.playerReducer.gravatarEmail,
  score: state.playerReducer.score,
  isReady: state.gameReducer.isReady,
  questionsData: state.gameReducer.questionsData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIQuestions: (parm) => dispatch(actions.fetchAPIQuestions(parm)),
});

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  fetchAPIQuestions: PropTypes.func.isRequired,
  questionsData: PropTypes.shape({
    results: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
