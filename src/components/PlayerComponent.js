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
      <header className="player-header">
        <div>
          <img
            data-testid="header-profile-picture"
            src={ linkImage }
            alt="User Gravatar"
          />
        </div>
        <div>
          <p>
            Player:
            {' '}
            <span data-testid="header-player-name">{ player.name }</span>
          </p>
          <p data-testid="header-score">Placar: 0</p>
        </div>
      </header>
    );
  }
}

export default PlayerComponent;
