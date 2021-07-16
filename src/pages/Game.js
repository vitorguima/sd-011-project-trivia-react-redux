import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import * as actions from '../redux/actions';
import HandleQuestions from './components/HandleQuestions';

class Game extends Component {
  componentDidMount() {
    const { isLoading, name, email, score, token, assertions } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    if (!isLoading) {
      const player = {
        name,
        assertions,
        score,
        gravatarEmail: email,
      };
      localStorage.setItem('player', JSON.stringify(player));
    }
  }

  render() {
    const { name, email, score } = this.props;
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
        <HandleQuestions />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  isLoading: state.loginReducer.isLoading,
  name: state.playerReducer.name,
  assertions: state.playerReducer.assertions,
  email: state.playerReducer.gravatarEmail,
  score: state.playerReducer.score,
  isReady: state.gameReducer.isReady,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPIQuestions: (parm) => dispatch(actions.fetchAPIQuestions(parm)),
});

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
