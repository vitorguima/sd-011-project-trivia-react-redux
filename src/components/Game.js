import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';


class Game extends Component {
  render() {
    const { getState } = this.props;
    const hashEmail = md5(getState.email).toString();
    const getLocalStorage = JSON.parse(localStorage.getItem('player'));
    return (
      <div>
        <header>
          <div>
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="profile" />
            <h3
              data-testid="header-player-name"
            >
              { getState.name || getLocalStorage.name}
            </h3>
            <span
              data-testid="header-score"
            >
              { !getLocalStorage ? 'Carregando' : getLocalStorage.score }
            </span>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getState: state.login,
  sendToken: state.login.token,
});

// const mapDispatchToProps = {

// };

export default connect(mapStateToProps)(Game);
