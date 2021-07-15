import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../redux/actions';
import LoginHeader from './components/LoginHeader';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { fetchAPIToken, getUserNameAndEmail } = this.props;
    const { name, gravatarEmail } = this.state;
    fetchAPIToken();
    getUserNameAndEmail(name, gravatarEmail);
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <div className="App-header">
        <LoginHeader />
        <section>
          <label htmlFor="Nome do Jogador">
            Name
            <input
              data-testid="input-player-name"
              name="name"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="Email do Jogador">
            Email
            <input
              data-testid="input-gravatar-email"
              name="gravatarEmail"
              type="email"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              data-testid="btn-play"
              disabled={ !(name && gravatarEmail) }
              type="button"
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  fetchAPIToken: PropTypes.func.isRequired,
  getUserNameAndEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchAPIToken: () => dispatch(actions.fetchAPIToken()),
  getUserNameAndEmail: (name, gravatarEmail) => (
    dispatch(actions.getUserNameAndEmail(name, gravatarEmail))
  ),
});

export default connect(null, mapDispatchToProps)(Login);
