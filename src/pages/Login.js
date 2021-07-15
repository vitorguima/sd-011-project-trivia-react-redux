import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
          <button type="button" data-testid="btn-play" disabled={ !(name && email) }>
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <div>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ fetchTokenDispatch }
            >
              Configurações
            </button>
          </div>
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
