import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/GameScreenHeader.css';

export default function GameScreenHeader() {
  const gameState = useSelector((state) => state.game);
  const { currentQuestion } = gameState;
  const { hashEmail, state } = localStorage;
  const { player } = JSON.parse(state);
  const { score, name } = player;

  useEffect(() => {}, [currentQuestion]);

  return (
    <header className="header-container">
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${hashEmail}` }
        alt="Player avatar"
      />
      <span className="player-name" data-testid="header-player-name">
        {name}
      </span>
      <span data-testid="header-score">{score}</span>
    </header>
  );
}
