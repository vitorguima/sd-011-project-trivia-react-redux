import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchQuestion } from '../redux/actions';

class Game extends Component {
  componentDidUpdate() {
    const { token, fetchQuestions } = this.props;
    console.log(token);
    fetchQuestions(token);
  }

  render() {
    const { players, email } = this.props;
    const objectsLocalStorage = JSON.parse(localStorage.getItem('state'));
    const hashGenerator = md5(email).toString();

    return (
      <div>
        <header>
          <h3 data-testid="header-player-name">{players}</h3>
          <img
            src={ `https://www.gravatar.com/avatar/${hashGenerator}` }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
          <p>
            <span data-testid="header-score">
              {!objectsLocalStorage ? 0 : objectsLocalStorage.score}
            </span>
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.homeReducer.email,
  players: state.homeReducer.name,
  token: state.homeReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestion(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  players: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
