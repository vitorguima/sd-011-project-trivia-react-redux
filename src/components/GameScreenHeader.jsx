import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/GameScreenHeader.css';

export default function GameScreenHeader() {
  const playerState = useSelector((state) => state.player);
  let { hashEmail, state } = localStorage;
  let { player } = JSON.parse(state);
  let { score, name } = player;
  useEffect(() => {
    const { state } = localStorage;
    const { player } = JSON.parse(state);
    score = player.score;
    name = player.name;
  }, [playerState])
  return (
    <header className="header-container">
      <img
        src={`https://www.gravatar.com/avatar/${hashEmail}`}
        data-testid="header-profile-picture"
        alt="Player avatar"
      />
      <span className="player-name" data-testid="header-player-name">
        {name}
      </span>
      <span data-testid="header-score">{score}</span>
    </header>
  );
}
