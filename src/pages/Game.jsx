import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Layout from '../components/common/Layout';

class Game extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <Layout title="Game">
        <main>
          <header>
            <img
              src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
              alt="avatar"
              data-testid="header-profile-picture"
            />
            <h1 data-testid="header-player-name">{name}</h1>
            <p>
              Pontuação atual:&nbsp;
              <span data-testid="header-score">
                { score }
              </span>
            </p>
          </header>
          <div>Tela do jogo</div>
        </main>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.gravatarEmail,
  name: state.user.name,
  score: state.user.score,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
