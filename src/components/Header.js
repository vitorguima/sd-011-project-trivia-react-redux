import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = md5(email);
    return (
      <div className="header-container">
        <img
          data-testid="header-profile-picture"
          className="avatar"
          alt="gravatar"
          src={ `https://www.gravatar.com/avatar/${hash}` }
        />
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p data-testid="header-score">{`Placar: ${score}`}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  email: player.email,
  score: player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
