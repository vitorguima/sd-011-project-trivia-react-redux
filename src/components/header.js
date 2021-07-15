import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import store from '../store';

export default class Headr extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      email: '',
      name: '',
    };
    this.fetchAvatar = this.fetchAvatar.bind(this);
  }

  componentDidMount() {
    this.fetchAvatar();
  }

  async fetchAvatar() {
    const { email: { email, name } } = store.getState();
    const avatar = md5(email).toString();
    const avatarFetch = await fetch(`https://www.gravatar.com/avatar/${avatar}`);
    await this.setState({
      email: avatarFetch.url,
      name,
    });
  }

  render() {
    const { score, email, name } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profilePhoto"
          src={ email }
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}
