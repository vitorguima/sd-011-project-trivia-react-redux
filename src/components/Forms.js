import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchGameAction } from '../actions';

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { id } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [id]: value });
  }

  play() {
    const { fetchGame } = this.props;
    const { name, email } = this.state;
    const obj = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(obj));
    fetchGame();
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form>
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
          <Link to="/game">
            <button
              disabled={ !(name && email) }
              type="button"
              data-testid="btn-play"
              onClick={ () => this.play() }
            >
              Play
            </button>
          </Link>
        </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchGame: () => dispatch(fetchGameAction()),
});

Forms.propTypes = {
  fetchGame: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Forms);
