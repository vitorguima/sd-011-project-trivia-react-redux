import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction, fetchToken, fetchGravatar, fetchGame } from '../actions';

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isValid: false,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleFormChange() {
    const loginForm = document.querySelector('.login-form');
    this.setState({ isValid: loginForm.checkValidity() });
  }

  handleClick() {
    const { token, login, gravatar, game, gameToken } = this.props;
    const { name, email } = this.state;
    token();
    login(name, email);
    gravatar(email);
    game(gameToken);
  }

  render() {
    const { isValid } = this.state;
    return (
      <form className="login-form" onChange={ this.handleFormChange }>
        <label htmlFor="player-name">
          Nome
          <input
            id="player-name"
            data-testid="input-player-name"
            type="text"
            name="name"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="player-email">
          E-mail
          <input
            id="player-email"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            onChange={ this.handleChange }
            required
          />
        </label>
        <Link to="/quiz">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !isValid }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  gameToken: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  token: () => dispatch(fetchToken()),
  login: (name, email) => dispatch(loginAction(name, email)),
  gravatar: (email) => dispatch(fetchGravatar(email)),
  game: (gameToken) => dispatch(fetchGame(gameToken)),
});

FormLogin.propTypes = {
  token: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  gravatar: PropTypes.func.isRequired,
  game: PropTypes.func.isRequired,
  gameToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
