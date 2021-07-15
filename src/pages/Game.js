import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestionsThunk } from '../actions';

class Game extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions(localStorage.getItem('token'));
  }

  render() {
    const { loading, token, hash, name, score, questions, getQuestions } = this.props;
    if (loading) {
      return <div>Carregando...</div>;
    }
    return (
      <div>
        <p data-testid="header-player-name">
          { name }
        </p>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Gravatar" />
        <p data-testid="header-score">
          {' '}
          { score }
        </p>
        <form>
          <h1>Pergunta 1</h1>
        </form>
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
