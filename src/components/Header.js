import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatar: '',
      name: '',
    };
  }

  componentDidMount() {
    this.transformGravatar();
  }

  transformGravatar() {
    const store = JSON.parse(localStorage.getItem('state'));
    const hashEmail = md5(store.player.email).toString();
    const { name } = store.player;
    this.setState({ gravatar: hashEmail, name });
  }

  render() {
    const { gravatar, name } = this.state;

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{`Nome: ${name}`}</p>
        <p data-testid="header-score">Score: 0</p>
      </div>
    );
  }
}

export default Header;
