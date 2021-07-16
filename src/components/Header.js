import React, { Component } from 'react';

class header extends Component {
  render() {
    // const { player: { gravatarEmail, name } } = getStorage();
    return (
      <div>
        <header>
          <h1>Settings</h1>
          <img
            src="teste"
            testedata-testid="header-profile-picture"
            alt="teste"
          />
          <span
            data-testid="header-player-name"
          >
            teste
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
