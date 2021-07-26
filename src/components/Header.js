import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  convertEmail(email) {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    return (
      <div className="Header">
        <img
          src={ this.convertEmail(gravatarEmail) }
          alt="Avatar do Jogador"
          data-testid="header-profile-picture"
        />
        <div>
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.playerReducer,
});

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
