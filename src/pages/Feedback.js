import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const MD5 = md5(gravatarEmail).toString();
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <h1 data-testid="feedback-text">
          FeedBack
        </h1>
        <h2 data-testid="feedback-text">
          Mensagem
        </h2>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${MD5}` } alt="avatar" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ state.player.score }</p>
        </header>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

// Abertura de novo PR para requisito 15
// Secessário em algum momento trocar a origem da informação 'score' de localStorage para o estado global.

const mapStateToProps = (state) => ({
  gravatarEmail: state.playerReducer.gravatarEmail,
  name: state.playerReducer.name,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
