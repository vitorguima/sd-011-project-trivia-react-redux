import React, { Component } from 'react';

class header extends Component {
  render() {
    const getStorage = () => JSON.parse(localStorage.state);
    const { player: { gravatarEmail, name } } = getStorage();
    return (
      <div>
        <header>
          <h1>JOGO</h1>
          <img
            src={ gravatarEmail }
            data-testid="header-profile-picture"
            alt={ name }
          />
          <span
            data-testid="header-player-name"
          >
            { name }
          </span>
          <span
            data-testid="header-score"
          >
            0
          </span>
        </header>
      </div>
    );
  }
}

export default header;
