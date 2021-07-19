import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <main>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Gravatar" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <div data-testid="feedback-text">oi oi oi oi oi oi oi oi oi</div>
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
