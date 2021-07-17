import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  getStorages() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      name: ranking[0].name,
      image: ranking[0].picture,
      score: ranking[0].score,
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
