import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGameAction } from '../actions';

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.savePlayerToLocalStorage = this.savePlayerToLocalStorage.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [id]: value });
  }

  savePlayerToLocalStorage() {
    const { fetchGame } = this.props;
    const { name, email } = this.state;
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };

    localStorage.setItem('state', JSON.stringify(player));
    this.redirectUser();
    fetchGame();
  }

  redirectUser() {
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <form className="trivia__forms">
        <label htmlFor="name">
          <input
            data-testid="input-player-name"
            value={ name }
            id="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            data-testid="input-gravatar-email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ !(name && email) }
          type="button"
          data-testid="btn-play"
          onClick={ () => this.savePlayerToLocalStorage() }
        >
          Play
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchGame: () => dispatch(fetchGameAction()),
});

Forms.propTypes = {
  fetchGame: PropTypes.string,
}.isRequired;

export default withRouter(connect(null, mapDispatchToProps)(Forms));
