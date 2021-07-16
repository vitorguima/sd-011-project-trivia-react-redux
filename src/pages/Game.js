import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestionsThunk } from '../actions';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.colorOptions = this.colorOptions.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    if (localStorage.token) {
      getQuestions(localStorage.getItem('token'));
    }
  }

  colorOptions() {
    const rightAnswer = document.querySelector('#correct-answer');
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    rightAnswer.classList.add('correct-color');
    wrongAnswers.forEach((answer) => {
      answer.classList.add('wrong-color');
    });
  }

  render() {
    const { loading, hash, name, score, questions } = this.props;

    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Gravatar" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <div>
          {!loading
            ? (
              <div>
                <h5 data-testid="question-category">{questions.results[0].category}</h5>
                <h2 data-testid="question-text">{questions.results[0].question}</h2>
                <button
                  type="button"
                  data-testid="correct-answer"
                  id="correct-answer"
                  onClick={ this.colorOptions }
                >
                  {questions.results[0].correct_answer}
                </button>
                {questions.results[0].incorrect_answers.map((incorrect, key) => (
                  <button
                    key={ key }
                    type="button"
                    data-testid="wrong-answer"
                    id="wrong-answer"
                    onClick={ this.colorOptions }
                  >
                    { incorrect }
                  </button>
                ))}
              </div>) : <p>loading...</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token,
  loading: state.game.loading,
  score: state.game.score,
  hash: state.login.hash,
  name: state.login.name,
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionsThunk(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  token: PropTypes.string,
  loading: PropTypes.bool,
}.isRequired;
