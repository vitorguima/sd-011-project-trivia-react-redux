import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: JSON.parse(localStorage.getItem('state')).player.score,
    };
  }

  render() {
    const { playerName, email } = this.props;
    const { totalScore } = this.state;
    return (
      <div>
        <div>
          <img src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt={ playerName } data-testid="header-profile-picture" />
          <label htmlFor="user-name">
            Jogador:
            <span id="user-name" data-testid="header-player-name">{ playerName }</span>
          </label>
        </div>
        <div>
          Pontos:
          <span data-testid="header-score">
            { totalScore }
          </span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.login.email,
  playerName: state.login.playerName,
});

export default connect(mapStateToProps)(Header);
