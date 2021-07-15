import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GamePage extends Component {
  render() {
    const { token, name, gravatarEmail, score } = this.props;
    localStorage.setItem('token', token);
    const MD5 = md5(gravatarEmail).toString();

    return (
      <div>
        <header>
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{score}</p>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${MD5}` } alt="avatar" />
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ tokenReducer, playerReducer }) => ({
  token: tokenReducer.token,
  name: playerReducer.name,
  gravatarEmail: playerReducer.gravatarEmail,
  score: playerReducer.score,
});

// const mapDispatchToProps = (dispatch) => ({
// });

GamePage.propTypes = {
  token: PropTypes.string,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(GamePage);
