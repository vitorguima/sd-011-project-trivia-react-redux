import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    const quantAcertos = 3;
    const localStorageAssertions = JSON.parse(localStorage.getItem('state'))
      .player.assertions;
    return (
      <main>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Gravatar" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <h5
          data-testid="feedback-text"
        >
          { localStorageAssertions < quantAcertos
            ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h5>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Feedback.propTypes = {
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
