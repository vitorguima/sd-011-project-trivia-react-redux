import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class PlayerComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   const { nameUser, emailUser } = this.props;
  //   this.state = {
  //     player: {
  //       name: nameUser,
  //       gravatarEmail: emailUser,
  //     },
  //   };
  // }

  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    const pictureHash = md5(player.email).toString();
    const linkImage = `https://www.gravatar.com/avatar/${pictureHash}`;
    return (
      <header className="container-player-game">
        <div>
          <img
            data-testid="header-profile-picture"
            src={ linkImage }
            alt="User Gravatar"
          />
          <p className="player-name" data-testid="header-player-name">{ player.name }</p>
        </div>
        <h1 className="placar" data-testid="header-score">Placar: 0</h1>
      </header>
    );
  }
}

export default PlayerComponent;
