import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends Component {
  constructor() {
    super();

    this.setItemOnLocalStorage = this.setItemOnLocalStorage.bind(this);
  }

  setItemOnLocalStorage() {
    const { token, isLoading, name, score, email } = this.props;
    const player = {
      name,
      assertions: 0,
      score,
      gravatarEmail: email,
    };//
    if (!isLoading) {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('player', JSON.stringify(player));
    }
  }

  render() {
    const { isLoading, name, email, score } = this.props;
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
        {isLoading ? 'Carregando...' : null}
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
});

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
