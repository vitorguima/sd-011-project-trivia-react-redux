import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameHeader extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <p>
          Pontuação atual:&nbsp;
          <span data-testid="header-score">
            { score }
          </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.gravatarEmail,
  name: state.user.name,
  score: state.user.score,
});

export default connect(mapStateToProps)(GameHeader);

GameHeader.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
