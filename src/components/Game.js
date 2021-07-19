import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchQuestions } from '../actions';
import '../App.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      num: 0,
      styleButton: false,
      disabled: false,
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    const { getToken, fetchApiQuestions } = this.props;
    fetchApiQuestions(getToken);
  }

  handleClickState() {
    const { styleButton, timer } = this.state;
    clearInterval(timer);
    if (!styleButton) {
      this.setState({
        styleButton: true,
        disabled: true,
        // resetTimer: false,
        // answer: true,
      });
    }
  }

  renderAnswers() {
    const { getQuestions } = this.props;
    const { num, styleButton, disabled } = this.state;
    if (getQuestions.length > 0) {
      return [
        ...getQuestions[num].incorrect_answers.map((value, index) => (
          <button
            className={ styleButton ? 'wrong' : 'default' }
            type="button"
            data-testid={ `wrong-answer-${num}` }
            key={ index }
            disabled={ disabled }
            onClick={ this.handleClickState }
          >
            { value }
          </button>
        )),
        (
          <button
            className={ styleButton ? 'success' : 'default' }
            type="button"
            data-testid="correct-answer"
            value={ getQuestions[num].correct_answer }
            key={ num }
            disabled={ disabled }
            onClick={ () => {
              this.handleClickState();
              // this.handleScorteAssetions(event);
            } }
          >
            {getQuestions[num].correct_answer}
          </button>
        ),
      ];
    }
  }

  renderQuestion() {
    const { getQuestions } = this.props;
    const { num } = this.state;
    if (getQuestions.length > 0) {
      return (
        <>
          <div data-testid="question-text">{getQuestions[num].question}</div>
          <p data-testid="question-category">{getQuestions[num].category}</p>
        </>
      );
    }
  }

  render() {
    const { getState } = this.props;
    const hashEmail = md5(getState.email).toString();
    const getLocalStorage = JSON.parse(localStorage.getItem('player'));
    return (
      <div>
        <header>
          <div>
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="profile" />
            <h3
              data-testid="header-player-name"
            >
              { getState.name || getLocalStorage.name}
            </h3>
            <span
              data-testid="header-score"
            >
              { !getLocalStorage ? 'Carregando' : getLocalStorage.score }
            </span>
          </div>
        </header>
        <div>
          { this.renderQuestion() }
          { this.renderAnswers() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getState: state.login,
  getToken: state.login.token,
  getQuestions: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  getState: PropTypes.obj,
  getToken: PropTypes.string,
}.isRequired;
