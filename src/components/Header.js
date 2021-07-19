import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getPlayerLocalStorage } from '../services/LocalStorage';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
      score: 0,
    };

    this.getStorages = this.getStorages.bind(this);
  }

  componentDidMount() {
    this.getStorages();
    window.addEventListener('storage', this.getStorages());
  }

  componentDidUpdate(prevProps) {
    // const { answered } = this.props;
    if (prevProps !== this.props) {
      this.getStorages();
    }
  }

  async getStorages() {
    const user = await getPlayerLocalStorage();
    const { player } = user;
    const generateHash = md5(player.gravatarEmail).toString();
    const response = await fetch(`https://www.gravatar.com/avatar/${generateHash}`);
    this.setState({
      name: player.name,
      image: response.url,
      score: player.score,
    });
  }

  render() {
    const { name, image, score, answer } = this.state;
    return (
      <header>
        <img src={ image } alt="gravatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
        <p hidden>{ answer }</p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  answered: state.questionsReducer.answered,
});

export default connect(mapStateToProps)(Header);
