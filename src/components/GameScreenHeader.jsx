import { MD5 } from 'crypto-js';
import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/GameScreenHeader.css';
import PropTypes from 'prop-types';

export default function GameScreenHeader({ player }) {
  const email = useSelector((state) => state.login.email);
  const hashEmail = MD5(email).toString();
  const userName = useSelector((state) => state.login.name);
  return (
    <header className="header-container">
      <img
        src={ `https://www.gravatar.com/avatar/${hashEmail}` }
        data-testid="header-profile-picture"
        alt="Player avatar"
      />
      <span className="player-name" data-testid="header-player-name">
        {userName}
      </span>
      <span data-testid="header-score">{player.player.score}</span>
    </header>
  );
}

GameScreenHeader.propTypes = {
  player: PropTypes.string.isRequired,
};
