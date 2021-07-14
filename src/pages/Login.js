import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { name, email } = this.state;
    const { fetchTokenDispatch } = this.props;
    return (
      <div>
        <p>
          SUA VEZ
        </p>
        <label htmlFor="name">
          Name:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/gamepage">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(name && email) }
            onClick={ () => fetchTokenDispatch() }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTokenDispatch: () => dispatch(fetchToken()),
});

Login.propTypes = {
  fetchTokenDispatch: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
