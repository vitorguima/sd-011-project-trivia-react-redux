import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { loading, token, hash, name, pontuation } = this.props;
    if (loading) {
      return (<p> Carregando...</p>);
    }
    localStorage.setItem('token', token);
    return (
      <div>
        <p data-testid="header-player-name">
          { name }
        </p>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Gravatar" />
        <p data-testid="header-score">
          {' '}
          { pontuation }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token,
  loading: state.game.loading,
  pontuation: state.game.pontuation,
  hash: state.login.hash,
  name: state.login.name,

});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  token: PropTypes.string,
  loading: PropTypes.bool,
}.isRequired;
