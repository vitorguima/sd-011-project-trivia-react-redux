import React from 'react';
import '../styles/GameScreenHeader.css';

export default function GameScreenHeader() {
  const { hashEmail, state } = localStorage;
  const { player } = JSON.parse(state);
  return (
    <header className="header-container">
      <img
        src={ `https://www.gravatar.com/avatar/${hashEmail}` }
        data-testid="header-profile-picture"
        alt="Player avatar"
      />
      <span className="player-name" data-testid="header-player-name">
        {player.name}
      </span>
      <span data-testid="header-score">{player.score}</span>
    </header>
  );
}
