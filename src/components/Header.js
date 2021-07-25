import React from 'react';
import { useSelector } from 'react-redux';
import '../style/header.css';

function Header() {
  const { username, avatar, score } = useSelector((state) => state.user);
  return (
    <header>
      <div className="header-container">
        <div className="header-user-container">
          <img
            className="header-avatar"
            src={ avatar }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">
            Jogador(a):
            <span>{ username }</span>
          </h3>
        </div>
        <h3>
          Pontos:
          <span data-testid="header-score">{ score }</span>
        </h3>
      </div>
    </header>
  );
}

export default Header;
