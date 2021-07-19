import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/GameScreenHeader.css';
import { MD5 } from 'crypto-js';

export default function GameScreenHeader() {
  const gameState = useSelector((state) => state.game);
  const { currentQuestion } = gameState;
  const { state } = localStorage;
  const { player } = JSON.parse(state);
  const { score, name, gravatarEmail } = player;

  const hashEmail = MD5(gravatarEmail).toString();
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
