import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.message = this.message.bind(this);
  }

  message() {
    const localStoragePlayer = JSON.parse(localStorage.getItem('state'));
    const badAssertions = 3;
    const answer1 = 'Podia ser melhor...';
    const answer2 = 'Mandou bem!';
    return localStoragePlayer.player.assertions < badAssertions ? answer1 : answer2;
  }

  render() {
    const localStoragePlayer = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header score={ localStoragePlayer.player.score } />
        <h2 data-testid="feedback-total-score">
          {localStoragePlayer.player.score ? localStoragePlayer.player.score : 0}
        </h2>
        <h2 data-testid="feedback-total-question">
          {localStoragePlayer.player.assertions
            ? localStoragePlayer.player.assertions : 0}
        </h2>
        <h2 data-testid="feedback-text">{this.message()}</h2>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
