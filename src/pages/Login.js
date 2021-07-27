import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../service/tokenApi';
import { sendUser, sendEmail } from '../actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user: '',
      disableBtn: true,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.localStoragehandle = this.localStoragehandle.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.handleLogin();
      },
    );
  }

  localStoragehandle() {
    const { email, user } = this.state;
    const player = {
      player: {
        name: user,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  handleLogin() {
    const { email, user } = this.state;
    if (email !== '' && user !== '') {
      this.setState({
        disableBtn: false,
      });
    } else {
      this.setState({
        disableBtn: true,
      });
    }
  }

  render() {
    const { disableBtn, user, email } = this.state;
    const { updateUser, updateEmail } = this.props;
    return (
      <div>
        <form>
          <header className="App-header">
            <img src={ logo } height="150px" alt="logo" />
            <label htmlFor="user">
              Usuário
              <input
                data-testid="input-player-name"
                id="user"
                name="user"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              E-mail
              <input
                data-testid="input-gravatar-email"
                id="email"
                name="email"
                onChange={ this.handleChange }
              />
            </label>
            <Link to="/trivia">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ disableBtn }
                onClick={ () => {
                  fetchToken();
                  this.localStoragehandle();
                  updateUser(user);
                  updateEmail(email);
                } }
              >
                Jogar
              </button>
            </Link>
            <Link to="/settings">
              <button type="button" data-testid="btn-settings">Configurações</button>
            </Link>
          </header>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  updateUser: PropTypes.func,
  updateEmail: PropTypes.func,
};

Login.defaultProps = {
  updateUser: undefined,
  updateEmail: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (state) => dispatch(sendUser(state)),
  updateEmail: (state) => dispatch(sendEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
