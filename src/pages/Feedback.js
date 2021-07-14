import React, { Component } from 'react';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      name:'',
      score: 0,
      gravatarImage: '',
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <header>
        <img
          src={ gravatarImage }
          alt="player_image"
          data-testid="header-profile-picture"
        />
        <div data-testid="feedback-text">Feedback</div>
        <div data-testid="header-player-name">{name}</div>
        <div data-testid="header-score">{ score }</div>
      </header>
    );
  }
}

export default Feedback;
