import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { name, score, userToken } = this.props;
    return (
      <section>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${userToken}` }
            alt="user thumbnail"
          />
          <div className="player-info">
            <h3 data-testid="header-player-name">
              { name }
            </h3>
            <p data-testid="header-score">
              Score:
              { score }
            </p>
          </div>
        </header>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.login.score,
  userToken: state.login.userToken,
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  userToken: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Game);
