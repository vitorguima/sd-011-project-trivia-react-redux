import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class HeaderGame extends Component {
  render() {
    const { name, score, email } = this.props;
    return (
      <header>
        <div className="player-info">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="user thumbnail"
          />
          <h3 data-testid="header-player-name">
            { name }
          </h3>
          <p data-testid="header-score">
            Score:
            { score }
          </p>
        </div>
      </header>
    );
  }
}

HeaderGame.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.login.score,
  email: state.login.email,
});

export default connect(mapStateToProps)(HeaderGame);
